using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        private readonly IHubContext<NotificationHub> _context;
        public AuctionCreatedConsumer(IHubContext<NotificationHub> context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            await _context.Clients.All.SendAsync("AuctionCreated", context.Message);
        }
    }
}
