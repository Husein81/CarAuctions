using AuctionService.Dtos;
using AuctionService.Entities;
using AutoMapper;

namespace AuctionService.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Entity → DTO mappings
            CreateMap<Auction, AuctionDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
            CreateMap<Item, ItemDto>();

            // DTO → Entity mappings
            CreateMap<CreateAuctionDto, Auction>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src));
            
            CreateMap<CreateAuctionDto, Item>();
            CreateMap<ItemDto, Item>();
        }
    }
}
