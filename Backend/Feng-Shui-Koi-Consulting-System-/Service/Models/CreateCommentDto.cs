using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models
{
    public class CreateCommentDto
    {
        public string CommentData { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int DestinyId { get; set; }
    }
}
