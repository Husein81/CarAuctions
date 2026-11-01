using AuctionService.Dtos;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Auction, AuctionDto>()
                .IncludeMembers(x => x.Item)
                // The entity property is named UpdateAt, so the name-based convention never matched it.
                .ForMember(d => d.UpdatedAt, o => o.MapFrom(s => s.UpdateAt));
            CreateMap<Item, AuctionDto>();
            CreateMap<CreateAuctionDto, Auction>()
                .ForMember(d => d.Item, o => o.MapFrom(s => s));
            CreateMap<CreateAuctionDto, Item>();
            CreateMap<AuctionDto, AuctionCreated>();
            CreateMap<Auction, AuctionUpdated>()
                .IncludeMembers(a => a.Item);
            CreateMap<Item, AuctionUpdated>();
        }
    }
}
