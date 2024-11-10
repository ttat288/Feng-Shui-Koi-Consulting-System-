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
        public KoiFishRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
        }

        public async Task<IEnumerable<KoiFish>> GetAllKoiFish(int? pageIndex = null, int? pageSize = null)
        {
            return await Get(pageIndex: pageIndex, pageSize: pageSize);
        }

        public async Task<KoiFish> GetKoiFishById(int id)
        {
            return await GetByID(id);
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
