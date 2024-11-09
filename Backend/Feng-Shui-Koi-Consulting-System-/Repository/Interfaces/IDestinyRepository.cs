using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IDestinyRepository
    {
        Task<bool> Exists(int destinyId);
        Task<Destiny?> FindByName(string destinyName);
        Task<Destiny> GetDestinyById(int id);
    }
}
