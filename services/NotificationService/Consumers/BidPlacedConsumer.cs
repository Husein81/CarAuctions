using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers
{
    public class BidPlacedConsumer: IConsumer<AuctionFinished>
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public BidPlacedConsumer(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
        }
    }
}
