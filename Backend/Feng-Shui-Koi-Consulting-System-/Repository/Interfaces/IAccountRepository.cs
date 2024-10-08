

using Repository.Entities;

namespace Repository.Interfaces
{
    public interface IAccountRepository
    {
        Task<AppUser?> CheckLoginAsync(String userName, String password);
        Task<Token?> GenerateAccessTokenAsync(int id);
    }
}
