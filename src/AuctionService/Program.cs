using AuctionService.Data;
using AuctionService.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

try
{
    DbSeed.InitDb(app);
}catch (Exception ex)
{
    Console.WriteLine($"Could not migrate the database {ex.Message}");
}

app.Run();
