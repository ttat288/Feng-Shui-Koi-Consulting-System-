using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class Destiny
{
    public int DestinyId { get; set; }

    public string DestitnyName { get; set; } = null!;

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<FishPond> FishPonds { get; set; } = new List<FishPond>();

    public virtual ICollection<KoiFish> KoiFishes { get; set; } = new List<KoiFish>();
}
