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
    public class KoiFishRepository : GenericRepository<KoiFish>, IKoiFishRepository
    {
        private readonly FengShuiKoiConsultingSystemContext _context;
        public KoiFishRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<KoiFish>> GetAllKoiFish(int? pageIndex = null, int? pageSize = null)
        {
            var query = _context.KoiFishes
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Blogs)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Comments)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.FishPonds)
        .AsQueryable();

            if (pageIndex.HasValue && pageSize.HasValue)
            {
                query = query.Skip(pageIndex.Value * pageSize.Value).Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<KoiFish> GetKoiFishById(int id)
        {
            return await _context.KoiFishes
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Blogs)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.Comments)
        .Include(fp => fp.Destiny)
            .ThenInclude(d => d.FishPonds)
        .FirstOrDefaultAsync(fp => fp.FishId == id);
        }

        public async Task CreateKoiFish(KoiFish koiFish)
        {
            await Insert(koiFish);
        }

        public async Task UpdateKoiFish(KoiFish koiFish)
        {
            Update(koiFish);
        }

        public async Task DeleteKoiFish(int id)
        {
            Delete(id);
        }
    }

}
