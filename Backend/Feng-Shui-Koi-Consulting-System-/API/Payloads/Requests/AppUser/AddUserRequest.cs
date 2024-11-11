using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Payloads.Request.AppUser
{
    public class AddUserRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string UserName { get; set; } = null!;

        public string UserPassword { get; set; }
        public int RoleId { get; set; }


        [StringLength(100, MinimumLength = 3)]

        public string? Fullname { get; set; }

        [Phone]
        public string? Phone { get; set; }
        public DateTime? Dob { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }

    }
    
}
