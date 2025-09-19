using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly AppDbContext _context;

        public AuctionFinishedConsumer(AppDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            var auction = await _context.Auctions.FindAsync(context.Message.AuctionId);
            if(auction == null)
            {
                return;
            }

            if (context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = context.Message.Amount;
            }

            auction.Status = auction.SoldAmount > auction.ReservePrice
                ? Status.Finished : Status.ReservedNotMet;

            await _context.SaveChangesAsync();
        }
    }
}
