using Repository.Entities;
using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IKoiFishService
    {
        Task<IEnumerable<KoiFish>> GetAllKoiFish(int? pageIndex = null, int? pageSize = null);
        Task<KoiFish> GetKoiFishById(int id);
        Task CreateKoiFish(KoiFishCreateDto koiFishDto);
        Task UpdateKoiFish(int id, KoiFishUpdateDto koiFishDto);
        Task DeleteKoiFish(int id);
    }
}
