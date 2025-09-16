namespace AuctionService.Dtos
{
    public record AuctionDto(
        Guid Id,
        int ReservePrice,
        string Seller,
        string? Winner,
        int? SoldAmount,
        int CurrentHighBid,
        DateTime CreatedAt,
        DateTime UpdatedAt,
        DateTime AuctionEnd,
        string Status,
        ItemDto Item
    );

    public record CreateAuctionDto(
        int ReservePrice,
        DateTime AuctionEnd,
        string Make,
        string Model,
        int Year,
        string Color,
        int Mileage,
        string ImageUrl
    );

    public record UpdateAuctionDto(
        string? Make,
        string? Model,
        int? Year,
        string? Color,
        int? Mileage,
        string? ImageUrl
    );

    public record ItemDto(
        string Make,
        string Model,
        int Year,
        string Color,
        int Mileage,
        string ImageUrl
    );
}