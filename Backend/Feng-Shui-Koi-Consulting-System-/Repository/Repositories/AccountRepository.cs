using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Repository.Interfaces;
using Repository.Entities;
using Repository.Utils;
using Repository.Common.Enums;

namespace Repository.Repositories
{
    public class AccountRepository  : IAccountRepository
    {
        private readonly FengShuiKoiConsultingSystemContext _context;
        private readonly IConfiguration _configuration;

        public AccountRepository(FengShuiKoiConsultingSystemContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AppUser?> CheckLoginAsync(string userName, string password)
        {
            password = PasswordHelper.ConvertToEncrypt(password);
            var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.UserName.Equals(userName)&& u.Password == password && u.Status == (int)Status.Exist);
            if (user == null)
            {
                return null;
            }
            return user;
        }
        public async Task<Token> GenerateAccessTokenAsync(int id)
        {
            var user = await _context.AppUsers.FindAsync(id);
            if (user == null)
            {
                return null!;
            }
            var Token = await JwtHelper.GenerateAccessTokenAsync(user, _context, _configuration);
            return Token;
        }

    }
}
