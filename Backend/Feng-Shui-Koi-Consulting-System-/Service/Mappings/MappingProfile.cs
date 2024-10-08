using AutoMapper;
using Repository.Entities;
using Service.Models;
using Service.Models.Token;


namespace Service.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping classes
            CreateMap<AppUser, AppUserDTO>()
                //.ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName))                            
                .ReverseMap();
            CreateMap<Token, TokenDto>().ReverseMap();
            CreateMap<RefreshToken, RefreshTokenDTO>().ReverseMap();

        }
    }
}
