﻿namespace Service.Models
{
    public class RefreshTokenDTO
    {
        public int RefreshTokenId { get; set; }

        public string RefreshTokenCode { get; set; } = null!;

        public string RefreshTokenValue { get; set; } = null!;

        public int UserId { get; set; }

        public string JwtId { get; set; } = null!;

        public bool? IsUsed { get; set; }

        public bool? IsRevoked { get; set; }

        public DateTime ExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
