using Repository.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Repository.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetRefreshTokenAsync(string refreshTokenValue);
        Task<RefreshToken?> CheckRefreshTokenByUserIdAsync(int userId);

        Task<bool> RemoveRefreshTokenAsync(RefreshToken refreshToken);
        TokenValidationParameters GetTokenValidationParameters();
    }
}
