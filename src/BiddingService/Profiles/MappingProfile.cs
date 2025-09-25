using AutoMapper;
using BiddingService.Dtos;
using BiddingService.Model;
using Contracts;

namespace BiddingService.Profiles
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<Bid, BidDto>();
            CreateMap<Bid, BidPlaced>();
        }
    }
}
