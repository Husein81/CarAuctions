using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
    {
        public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
        {
            Console.WriteLine("--> Consuming fault for auction created: " + context.Message.Message.Id);

            var exception = context.Message.Exceptions.First();

            if (exception.ExceptionType.Contains("ArgumentException") || 
                exception.Message.Contains("Invalid item model: Foo"))
            {
                Console.WriteLine("--> Correcting the model and republishing...");
                
                // Create a corrected version of the message
                var correctedMessage = context.Message.Message;
                correctedMessage.Model = "UpdatedModel"; // Fix the invalid model
                
                await context.Publish(correctedMessage);
                
                Console.WriteLine("--> Republished corrected auction created message");
            }
            else
            {
                Console.WriteLine($"--> Unhandled fault exception: {exception.ExceptionType}");
                Console.WriteLine($"--> Exception Message: {exception.Message}");
                Console.WriteLine($"--> StackTrace: {exception.StackTrace}");
            }
        }
    }
}
