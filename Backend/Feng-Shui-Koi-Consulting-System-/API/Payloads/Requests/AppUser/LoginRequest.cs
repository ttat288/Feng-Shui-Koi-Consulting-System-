﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace API.Payloads.Request.AppUser
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username is required")]
        [JsonProperty("use-namer")]
        public string UserName { get; set; } = string.Empty;
        [JsonProperty("password")]
        public string Password { get; set; } = string.Empty;
    }
}
