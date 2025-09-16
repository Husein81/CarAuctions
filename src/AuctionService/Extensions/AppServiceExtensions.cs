using AuctionService.Data;
using AuctionService.Profiles;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Extensions
{
    public static class AppServiceExtensions
    {
        public static void AddAppServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }
    }
}
