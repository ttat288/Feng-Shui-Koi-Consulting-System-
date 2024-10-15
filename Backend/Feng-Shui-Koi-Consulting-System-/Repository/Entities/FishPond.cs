using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class FishPond
{
    public int FishPondId { get; set; }

    public string PondName { get; set; } = null!;

    public string? ImgUrl { get; set; }

    public string? Description { get; set; }

    public int DestinyId { get; set; }

    public virtual Destiny Destiny { get; set; } = null!;
}
