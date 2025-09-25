using BiddingService.Consumers;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BiddingService.Extensions
{
    public static class AppServices
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMassTransit(x =>
            {
                x.AddConsumersFromNamespaceContaining<AuctionCreateConsumer>();

                x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(configuration["RabbitMq:Host"], "/", h =>
                    {
                        h.Username(configuration.GetValue("RabbitMq:Username", "guest"));
                        h.Password(configuration.GetValue("RabbitMq:Password", "guest"));
                    });
                    cfg.ConfigureEndpoints(context);
                });
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.Authority = configuration["IdentityServiceUrl"];
                    opt.RequireHttpsMetadata = false;
                    opt.TokenValidationParameters.ValidateAudience = false;
                    opt.TokenValidationParameters.NameClaimType = "username";
                });
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
    }
}
