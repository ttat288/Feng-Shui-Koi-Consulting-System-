using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class Blog
{
    public int BlogId { get; set; }

    public string? BlogTitle { get; set; }

    public string? BlogData { get; set; }

    public DateTime? CreateDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public int? Status { get; set; }

    public int DestinyId { get; set; }

    public int UserId { get; set; }

    public virtual Destiny Destiny { get; set; } = null!;

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual AppUser User { get; set; } = null!;
}
