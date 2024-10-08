using Repository.Entities;
using Repository.Repositories;


namespace Repository.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        Task<int> SaveAsync();
        public AccountRepository AccountRepository { get; }
        public RefreshTokenRepository RefreshTokenRepository { get; }
        public AppUserRepository AppUserRepository { get; }

    }
}
