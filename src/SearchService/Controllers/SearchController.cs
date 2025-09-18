using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SearchService.RequestHelpers;

namespace SearchService.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        private readonly IMongoCollection<Item> _itemsCollection;
        
        public SearchController(IMongoDatabase database)
        {
            _itemsCollection = database.GetCollection<Item>("items");
        }

        [HttpGet]
        public async Task<ActionResult<object>> SearchItems([FromQuery] SearchParams searchParams)
        {
            var filterBuilder = Builders<Item>.Filter;
            var filters = new List<FilterDefinition<Item>>();

            // Search By Term
            if (!string.IsNullOrEmpty(searchParams.SearchTerm))
            {   
                filters.Add(filterBuilder.Or(
                    filterBuilder.Regex(i => i.Make, new MongoDB.Bson.BsonRegularExpression(searchParams.SearchTerm, "i")),
                    filterBuilder.Regex(i => i.Model, new MongoDB.Bson.BsonRegularExpression(searchParams.SearchTerm, "i")),
                    filterBuilder.Regex(i => i.Color, new MongoDB.Bson.BsonRegularExpression(searchParams.SearchTerm, "i"))
                ));
            }

            if (!string.IsNullOrEmpty(searchParams.Seller))
            {
               filters.Add(filterBuilder.Eq(i => i.Seller, searchParams.Seller));
            }

            if (!string.IsNullOrEmpty(searchParams.Winner))
            {
                filters.Add(filterBuilder.Eq(i => i.Winner, searchParams.Winner));
            }
           
            if (!string.IsNullOrEmpty(searchParams.FilterBy))
            {
               switch (searchParams.FilterBy.ToLower())
               {
                    case "finished":
                        filters.Add(filterBuilder.Where(x => x.AuctionEnd < DateTime.UtcNow));
                        break;
                    case "endingsoon":
                        filters.Add(filterBuilder.Where(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow));
                        break;
                    default:
                        filters.Add(filterBuilder.Where(x => x.AuctionEnd > DateTime.UtcNow));
                        break;
                }
            }

            var sortBuilder = Builders<Item>.Sort;
            SortDefinition<Item> sort = sortBuilder.Ascending(i => i.AuctionEnd); // Default sort

            if (!string.IsNullOrEmpty(searchParams.OrderBy))
            {
                switch (searchParams.OrderBy.ToLower())
                {
                    case "make":
                        sort = sortBuilder.Ascending(a => a.Make);
                        break;
                    case "new":
                        sort = sortBuilder.Descending(a => a.CreatedAt);
                        break;
                    default:
                        sort = sortBuilder.Ascending(i => i.AuctionEnd);
                        break;
                }
            }

            var pageNumber = searchParams.PageNumber < 1 ? 1 : searchParams.PageNumber;
            var pageSize = searchParams.PageSize < 1 ? 4 : searchParams.PageSize;

            var filter = filters.Count > 0 ? filterBuilder.And(filters) : filterBuilder.Empty;

            // Get total count for pagination
            var totalCount = await _itemsCollection.CountDocumentsAsync(filter);
            
            // Get paginated results
            var results = await _itemsCollection
                .Find(filter)
                .Sort(sort)
                .Skip((pageNumber - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();

            var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            return Ok(new { 
                results,
                pageCount,
                totalCount,
                pageNumber,
                pageSize
            });
        }
    }
}