using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models
{
    public class FishPondDto
    {
        public int FishPondId { get; set; }
        public string PondName { get; set; }
        public string? ImgUrl { get; set; }
        public string? Description { get; set; }
    }
}
