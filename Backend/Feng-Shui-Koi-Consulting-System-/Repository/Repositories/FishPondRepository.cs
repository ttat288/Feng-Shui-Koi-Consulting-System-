using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class FishPondRepository : GenericRepository<FishPond>, IFishPondRepository
    {
        private readonly FengShuiKoiConsultingSystemContext _context;
        public FishPondRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FishPond>> GetAllFishPonds(int? pageIndex = null, int? pageSize = null)
        {
            var query = _context.FishPonds
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Blogs)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Comments)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.KoiFishes)
        .AsQueryable();

            if (pageIndex.HasValue && pageSize.HasValue)
            {
                query = query.Skip(pageIndex.Value * pageSize.Value).Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<FishPond> GetFishPondById(int id)
        {
            return await _context.FishPonds
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Blogs)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Comments)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.KoiFishes)
        .FirstOrDefaultAsync(fp => fp.FishPondId == id);
        }

        public async Task CreateFishPond(FishPond fishPond)
        {
            await Insert(fishPond);
        }

        public async Task UpdateFishPond(FishPond fishPond)
        {
            Update(fishPond);
        }

        public async Task DeleteFishPond(int id)
        {
            Delete(id);
        }
    }
}
