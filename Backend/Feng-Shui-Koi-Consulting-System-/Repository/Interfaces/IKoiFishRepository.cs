using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IKoiFishRepository
    {
        Task<IEnumerable<KoiFish>> GetAllKoiFish(int? pageIndex = null, int? pageSize = null);
        Task<KoiFish> GetKoiFishById(int id);
        Task CreateKoiFish(KoiFish koiFish);
        Task UpdateKoiFish(KoiFish koiFish);
        Task DeleteKoiFish(int id);
    }

}
