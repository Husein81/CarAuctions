using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly AppDbContext _context;

        public AuctionFinishedConsumer(AppDbContext context){
            _context = context;
        }

        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            // The contract carries the id as a string, but the key is a Guid; Find() throws on a type mismatch.
            if (!Guid.TryParse(context.Message.AuctionId, out var auctionId)) return;

            var auction = await _context.Auctions.FindAsync(auctionId);
            
            if(auction == null){
                return;
            }

            if (context.Message.ItemSold){
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = context.Message.Amount;
            }

            auction.Status = auction.SoldAmount > auction.ReservePrice
                ? Status.Finished : Status.ReservedNotMet;

            await _context.SaveChangesAsync();
        }
    }
}
