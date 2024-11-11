using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IFishPondRepository
    {
        Task<IEnumerable<FishPond>> GetAllFishPonds(int? pageIndex = null, int? pageSize = null);
        Task<FishPond> GetFishPondById(int id);
        Task CreateFishPond(FishPond fishPond);
        Task UpdateFishPond(FishPond fishPond);
        Task DeleteFishPond(int id);
    }
}
