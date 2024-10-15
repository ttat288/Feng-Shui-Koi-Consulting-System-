using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class AppUser
{
    public int UserId { get; set; }

    public string UserCode { get; set; } = null!;

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public int RoleId { get; set; }

    public DateOnly CreateDate { get; set; }

    public bool IsActive { get; set; }

    public int Status { get; set; }

    public string? Fullname { get; set; }

    public string? Phone { get; set; }

    public DateOnly? Dob { get; set; }

    public string? Gender { get; set; }

    public int? UpdateBy { get; set; }

    public DateOnly? UpdateDate { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual Role Role { get; set; } = null!;
}
