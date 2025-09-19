using MassTransit;
using MongoDB.Driver;
using Polly;
using Polly.Extensions.Http;
using SearchService.Consumers;
using SearchService.Services;
using System.Net;

namespace SearchService.Extensions
{
    public static class AppServiceExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Add services to the container.
            services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            services.AddOpenApi();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            
            // Add MongoDB services
            services.AddSingleton<IMongoClient>(serviceProvider =>
            {
                var connectionString = configuration.GetSection("MongoDB:ConnectionString").Value;
                return new MongoClient(connectionString);
            });
            
            services.AddSingleton<IMongoDatabase>(serviceProvider =>
            {
                var client = serviceProvider.GetRequiredService<IMongoClient>();
                var databaseName = configuration.GetSection("MongoDB:DatabaseName").Value;
                return client.GetDatabase(databaseName);
            });
            
            // Add HttpClient for AuctionService
            services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());
            
            services.AddMassTransit(x =>
            {
                x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(configuration["RabbitMq:Host"], "/", h =>
                    {
                        h.Username(configuration.GetValue("RabbitMq:Username", "guest"));
                        h.Password(configuration.GetValue("RabbitMq:Password", "guest"));
                    });

                    cfg.ReceiveEndpoint("search-auction-created", e =>
                    {
                        e.UseMessageRetry(r => r.Interval(5, 5));
                        e.ConfigureConsumer<AuctionCreatedConsumer>(context);
                    });

                    cfg.ReceiveEndpoint("search-auction-updated", e =>
                    {
                        e.UseMessageRetry(r => r.Interval(5, 5));
                        e.ConfigureConsumer<AuctionUpdatedConsumer>(context);
                    });

                    cfg.ConfigureEndpoints(context);
                });
            });
            
            static IAsyncPolicy<HttpResponseMessage> GetPolicy()
                => HttpPolicyExtensions
                    .HandleTransientHttpError()
                    .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
                    .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));
            
            return services;
        }
    }
}
