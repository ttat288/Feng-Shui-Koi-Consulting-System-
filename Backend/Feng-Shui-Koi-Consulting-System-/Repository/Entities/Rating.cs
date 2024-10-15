using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class Rating
{
    public int RateId { get; set; }

    public int BlogId { get; set; }

    public int UserId { get; set; }

    public virtual Blog Blog { get; set; } = null!;

    public virtual AppUser User { get; set; } = null!;
}
