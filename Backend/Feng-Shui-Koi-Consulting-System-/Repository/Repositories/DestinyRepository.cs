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
    public class DestinyRepository : GenericRepository<Destiny>, IDestinyRepository
    {
        public DestinyRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
        }

        public async Task<bool> Exists(int destinyId)
        {
            return await dbSet.AnyAsync(d => d.DestinyId == destinyId);
        }

        public async Task<Destiny?> FindByName(string destinyName)
        {
            return await dbSet.FirstOrDefaultAsync(d => d.DestitnyName == destinyName);
        }
    }

}
