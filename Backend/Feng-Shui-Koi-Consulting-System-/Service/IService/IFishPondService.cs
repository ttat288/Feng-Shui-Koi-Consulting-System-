using Repository.Entities;
using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IFishPondService
    {
        Task<IEnumerable<FishPond>> GetAllFishPonds(int? pageIndex = null, int? pageSize = null);
        Task<FishPond> GetFishPondById(int id);
        Task CreateFishPond(FishPondCreateDto fishPondDto);
        Task UpdateFishPond(int id, FishPondUpdateDto fishPondDto);
        Task DeleteFishPond(int id);
    }
}
