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
            var auction = await _context.Auctions.FindAsync(context.Message.AuctionId);

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

