using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Services;

namespace SearchService.Data
{
    public static class DbSeed
    {
        public static async Task InitDb(WebApplication app)
        {
            var connectionString = app.Configuration.GetSection("MongoDB:ConnectionString").Value;
            var databaseName = app.Configuration.GetSection("MongoDB:DatabaseName").Value;
            
            await DB.InitAsync(databaseName, MongoClientSettings.FromConnectionString(connectionString));

            await DB.Index<Item>()
                .Key(x => x.Make, KeyType.Text)
                .Key(x => x.Model, KeyType.Text)
                .Key(x => x.Color, KeyType.Text)
                .CreateAsync();

            var count = await DB.CountAsync<Item>();

            using var scope = app.Services.CreateScope();

            var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

            var items = await httpClient.GetItemsForSearchDb();

            Console.WriteLine(items.Count + " returned from the auction service");

            if (items.Count > 0) await DB.SaveAsync(items);
        }
    }
}
