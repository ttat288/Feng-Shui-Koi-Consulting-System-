using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models
{
    public class CommentDetails
    {
        public int CommentId { get; set; }

        public string? CommentData { get; set; }

        public DateTime? CreateDate { get; set; }

        public int DestinyId { get; set; }

        public int UserId { get; set; }
    }
}
