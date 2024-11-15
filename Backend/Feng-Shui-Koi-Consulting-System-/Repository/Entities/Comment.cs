using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class Comment
{
    public int CommentId { get; set; }

    public string? CommentData { get; set; }

    public DateTime? CreateDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public int? Status { get; set; }

    public int DestinyId { get; set; }

    public int UserId { get; set; }
    public int BlogId { get; set; }

    public virtual Destiny Destiny { get; set; } = null!;
    public virtual Blog Blog { get; set; } = null!;

    public virtual AppUser User { get; set; } = null!;
}
