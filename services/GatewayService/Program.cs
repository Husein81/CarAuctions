using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.Authority = builder.Configuration["IdentityServerURL"];
        opt.Audience = "auction";
        opt.RequireHttpsMetadata = false;
        opt.TokenValidationParameters.ValidateAudience = false;
        opt.TokenValidationParameters.NameClaimType = "username";
    });

// Configure CORS for the gateway to allow browser clients to call proxied services
builder.Services.AddCors(options =>
{
    options.AddPolicy("GatewayCors", policy =>
    {
        // If you need credentials (cookies/authorization headers) set specific origins via configuration and use AllowCredentials.
        // For simplicity allow any origin, method and header. Adjust for production.
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .WithExposedHeaders("WWW-Authenticate");
    });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.RequireAuthenticatedUser();
    });
});

var app = builder.Build();

// Use CORS before reverse proxy and authentication
app.UseCors("GatewayCors");

app.UseAuthentication();
app.UseAuthorization();

app.MapReverseProxy();

app.Run();
