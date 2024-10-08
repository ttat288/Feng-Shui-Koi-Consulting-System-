﻿using Newtonsoft.Json;
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
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Chỉ được chứa chữ cái và số")]
        public string UserName { get; set; } = null!;

        
        public int RoleId { get; set; }

        [Required]
        public bool IsActive { get; set; }


        [StringLength(100, MinimumLength = 3)]

        public string? Fullname { get; set; }

        [Phone]
        public string? Phone { get; set; }
        [Required]
        public DateOnly? Dob { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }
        public int? UpdateBy { get; set; } = 0;

    }
    
}
