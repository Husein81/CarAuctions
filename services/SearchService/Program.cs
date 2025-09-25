using MongoDB.Driver;
using Polly;
using SearchService.Data;
using SearchService.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAppServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS - IMPORTANT: Must be before other middleware
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