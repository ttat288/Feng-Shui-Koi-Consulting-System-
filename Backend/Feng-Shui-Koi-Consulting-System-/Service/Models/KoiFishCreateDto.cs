using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models
{
    public class KoiFishCreateDto
    {
        public string FishName { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public int DestinyId { get; set; }
    }
}
