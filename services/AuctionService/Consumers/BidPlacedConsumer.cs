using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly AppDbContext _context;

        public BidPlacedConsumer(AppDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            // The contract carries the id as a string, but the key is a Guid; Find() throws on a type mismatch.
            if (!Guid.TryParse(context.Message.AuctionId, out var auctionId)) return;

            var auction = await _context.Auctions.FindAsync(auctionId);

            if (auction == null) return;

            if (auction.CurrentHighBid == null
                || context.Message.BidStatus.Contains("Accepted") 
                && context.Message.Amount > auction.CurrentHighBid)
            {
                auction.CurrentHighBid = context.Message.Amount;
                await _context.SaveChangesAsync();
            }
        }
    }
}

