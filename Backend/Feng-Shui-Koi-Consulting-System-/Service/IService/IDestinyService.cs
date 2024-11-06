using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IDestinyService
    {
        Task<DestinyResultDto> GetDestinyIdByUserId(int userId);
    }
}
