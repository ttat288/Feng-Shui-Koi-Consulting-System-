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
        public FishPondRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
        }

        public async Task<IEnumerable<FishPond>> GetAllFishPonds(int? pageIndex = null, int? pageSize = null)
        {
            return await Get(pageIndex: pageIndex, pageSize: pageSize);
        }

        public async Task<FishPond> GetFishPondById(int id)
        {
            return await GetByID(id);
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
