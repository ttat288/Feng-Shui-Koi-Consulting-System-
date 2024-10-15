using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class KoiFish
{
    public int FishId { get; set; }

    public string? FishName { get; set; }

    public string? ImgUrl { get; set; }

    public string? Description { get; set; }

    public int DestinyId { get; set; }

    public virtual Destiny Destiny { get; set; } = null!;
}
