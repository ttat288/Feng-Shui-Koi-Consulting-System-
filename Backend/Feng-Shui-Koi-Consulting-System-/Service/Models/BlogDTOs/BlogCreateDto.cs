﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models.BlogDTOs
{
    public class BlogCreateDto
    {
        public string BlogTitle { get; set; }
        public string BlogData { get; set; }
        public string Description { get; set; }
        public int DestinyId { get; set; }
        public int UserId { get; set; }
    }

}
