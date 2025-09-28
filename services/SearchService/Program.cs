using MongoDB.Driver;
using Polly;
using Polly.Extensions.Http;
using SearchService.Data;
using SearchService.Extensions;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAppServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS - must be before other middleware that handles requests
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Lifetime.ApplicationStarted.Register(async () =>
{
    Console.WriteLine("Search Service started...");
    // Initialize database
    try
    {
       await Policy.Handle<TimeoutException>()
        .WaitAndRetryAsync(5, retryAttempt => TimeSpan.FromSeconds(10))
        .ExecuteAsync(async () => await DbSeed.InitDb(app));
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Could not initialize MongoDB: {ex.Message}");
    }
});

app.Run();

static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
{
    return HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
        .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));
}