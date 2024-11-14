using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models
{
    public class DestinyRmdDto
    {
        public int DestinyId { get; set; }
        public string DestinyName { get; set; }
        public List<KoiFishDto>? KoiFishList { get; set; } = new List<KoiFishDto>();
        public List<FishPondDto>? FishPondList { get; set; } = new List<FishPondDto>();

    }
}
