using Repository.Entities;
using Repository.Repositories;
using Microsoft.Extensions.Configuration;

namespace Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IConfiguration _configuration;
        private FengShuiKoiConsultingSystemContext _context;

        private AccountRepository _accountRepo;
        private RefreshTokenRepository _refreshTokenRepo;
        private AppUserRepository _appUserRepo;


        public UnitOfWork(FengShuiKoiConsultingSystemContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        public void Save()
        {
            _context.SaveChanges();
        }
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        AccountRepository IUnitOfWork.AccountRepository
        {
            get
            {
                if (_accountRepo == null)
                {
                    this._accountRepo = new AccountRepository(_context, _configuration);
                }
                return _accountRepo;
            }
        }
        RefreshTokenRepository IUnitOfWork.RefreshTokenRepository
        {
            get
            {
                if (_refreshTokenRepo == null)
                {
                    this._refreshTokenRepo = new RefreshTokenRepository(_context, _configuration);
                }
                return _refreshTokenRepo;
            }
        }
        public AppUserRepository AppUserRepository
        {
            get
            {
                if (_appUserRepo == null)
                {
                    this._appUserRepo = new AppUserRepository(_context);
                }
                return _appUserRepo;
            }
        }
    }
}
