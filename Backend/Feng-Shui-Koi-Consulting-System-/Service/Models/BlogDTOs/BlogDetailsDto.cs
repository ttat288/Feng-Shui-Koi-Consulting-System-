using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models.BlogDTOs
{
    public class BlogDetailsDto
    {
        public int BlogId { get; set; }
        public string? BlogTitle { get; set; }
        public string? Description { get; set; }
        public string? BlogImg { get; set; }
        public string? BlogData { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? Status { get; set; }
        //public int DestinyId { get; set; }

        //public int UserId { get; set; }

        public DestinyDto Destiny { get; set; }
        public UserDto User { get; set; }
        public BlogRatingDto Ratings { get; set; }
        public BlogCommentDto Comments { get; set; }
    }
}
