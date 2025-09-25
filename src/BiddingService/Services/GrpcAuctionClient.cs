using AuctionService;
using BiddingService.Model;
using Grpc.Net.Client;

namespace BiddingService.Services
{
    public class GrpcAuctionClient
    {
        private readonly ILogger<GrpcAuctionClient> _logger;
        private readonly IConfiguration _configuration;

        public GrpcAuctionClient(ILogger<GrpcAuctionClient> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        public async Task<Auction> GetAuctionAsync(string id)
        {
            _logger.LogInformation("Calling GRPC Service");
            var channel = GrpcChannel.ForAddress(_configuration["GrpcAuction"]);
            var client = new GrpcAuction.GrpcAuctionClient(channel);
            var request = new GetAuctionRequest { Id = id };

            try
            {
                var call = client.GetAuctionAsync(request);
                var reply = await call.ResponseAsync;

                if (reply?.Auction == null)
                {
                    _logger.LogWarning("GRPC reply did not contain auction");
                    return null;
                }

                var auction = new Auction
                {
                    ID = reply.Auction.Id,
                    AuctionEnd = DateTime.Parse(reply.Auction.AuctionEnd),
                    ReservePrice = reply.Auction.ReservePrice,
                    Seller = reply.Auction.Seller
                };
                return auction;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling GRPC Service");
                return null;
            }
        }
    }
}
