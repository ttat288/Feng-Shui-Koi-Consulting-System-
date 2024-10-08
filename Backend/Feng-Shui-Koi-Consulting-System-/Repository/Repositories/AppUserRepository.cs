using Repository.Entities;
using Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Repository.Repositories
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {
        private readonly FengShuiKoiConsultingSystemContext _context;

        public AppUserRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<AppUser> Get(
            int currentIDLogin,
            Expression<Func<AppUser, bool>> filter = null!,
            Func<IQueryable<AppUser>, IOrderedQueryable<AppUser>> orderBy = null!,
            string includeProperties = "",
            int? pageIndex = null, // Optional parameter for pagination (page number)
            int? pageSize = null)  // Optional parameter for pagination (number of records per page)
        {
            IQueryable<AppUser> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            // Implementing pagination
            if (pageIndex.HasValue && pageSize.HasValue)
            {
                // Ensure the pageIndex and pageSize are valid
                int validPageIndex = pageIndex.Value > 0 ? pageIndex.Value - 1 : 0;
                int validPageSize = pageSize.Value > 0 ? pageSize.Value : 10; // Assuming a default pageSize of 10 if an invalid value is passed

                query = query.Skip(validPageIndex * validPageSize).Take(validPageSize);
            }

            return query.Where(x => x.UserId != currentIDLogin);
        }

        public override async Task<AppUser> Insert(AppUser user)
        {
            await _context.AppUsers.AddAsync(user);

            return user;

        }

    }
}
