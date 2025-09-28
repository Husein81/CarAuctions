using System;
using System.Globalization;
using AuctionService;
using BiddingService.Model;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BiddingService.Services;

public class GrpcAuctionClient(IConfiguration config, ILogger<GrpcAuctionClient> logger)
{
    public Auction? GetAuction(string id)
    {
        logger.LogInformation($"==> Calling GRPC Service: {config["GrpcAuction"]}");

        var channel = GrpcChannel.ForAddress(config["GrpcAuction"]!);
        var client = new GrpcAuction.GrpcAuctionClient(channel);
        var request = new GetAuctionRequest { Id = id };

        try
        {
            var reply = client.GetAuction(request);

            DateTime auctionEnd;
            var endStr = reply.Auction.AuctionEnd ?? string.Empty;

            // Try parsing with invariant culture first, then current culture, then common formats
            if (!DateTime.TryParse(endStr, CultureInfo.InvariantCulture, DateTimeStyles.None, out auctionEnd)
                && !DateTime.TryParse(endStr, CultureInfo.CurrentCulture, DateTimeStyles.None, out auctionEnd))
            {
                var formats = new[] { "M/d/yyyy H:mm:ss", "M/d/yyyy HH:mm:ss", "MM/dd/yyyy HH:mm:ss", "yyyy-MM-ddTHH:mm:ssZ", "o" };
                if (!DateTime.TryParseExact(endStr, formats, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out auctionEnd))
                {
                    logger.LogWarning("Could not parse AuctionEnd '{AuctionEnd}' from GRPC reply. Value: {Value}", endStr, reply.Auction.AuctionEnd);
                    // Use a safe default to avoid treating the auction as finished
                    auctionEnd = DateTime.MaxValue;
                }
            }

            var auction = new Auction
            {
                ID = reply.Auction.Id,
                AuctionEnd = auctionEnd,
                Seller = reply.Auction.Seller,
                ReservePrice = reply.Auction.ReservePrice
            };

            return auction;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Could not call Grpc server");
            return null; // Return null if the auction cannot be retrieved
        }
    }
}