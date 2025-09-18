using System.ComponentModel.DataAnnotations;

namespace AuctionService.Dtos
{
    public class AuctionDto
    {
        public Guid Id { get; set; }
        public int ReservePrice { get; set; }
        public string Seller { get; set; }
        public string Winner { get; set; }
        public int SoldAmount { get; set; }
        public int CurrentHighBid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public int Mileage { get; set; }
        public string ImageUrl { get; set; }
    }

    public class CreateAuctionDto
    {
        [Required]
        public string Make { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public int Mileage { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public int ReservePrice { get; set; }

        [Required]
        public DateTime AuctionEnd { get; set; }
    }

    public class UpdateAuctionDto
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public int? Year { get; set; }
        public string Color { get; set; }
        public int? Mileage { get; set; }
        public string ImageUrl { get; set; }
    }
}