using AuctionService.Data;
using AuctionService.Extensions;
using AuctionService.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddControllers();


// Add services to the container.
builder.Services.AddAppServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use Routing and CORS so preflight (OPTIONS) requests are handled
app.UseRouting();
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
app.MapGrpcService<GrpcAuctionService>();

try
{
    DbSeed.InitDb(app);
}
catch (Exception ex)
{
    Console.WriteLine($"Could not migrate the database {ex.Message}");
}

app.Run();
