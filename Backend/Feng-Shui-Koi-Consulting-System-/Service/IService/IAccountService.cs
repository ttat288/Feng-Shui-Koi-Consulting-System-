using Service.Models;
using Service.Models.Token;

namespace Service.ISerivice
{
    public interface IAccountService
    {
        public  Task<AppUserDTO?> CheckLoginAsync(string userName, string password);
        public Task<TokenDto> GenerateAccessTokenAsync(int id);
        public Task<AppUserDTO> BanAccount(int id);
        public Task<bool> checkCorrectPassword(int id, string password);
    }
}
