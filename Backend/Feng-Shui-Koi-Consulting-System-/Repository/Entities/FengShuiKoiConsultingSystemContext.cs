using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Repository.Entities;

public partial class FengShuiKoiConsultingSystemContext : DbContext
{
    public FengShuiKoiConsultingSystemContext()
    {
    }

    public FengShuiKoiConsultingSystemContext(DbContextOptions<FengShuiKoiConsultingSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AppUser> AppUsers { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Destiny> Destinies { get; set; }

    public virtual DbSet<FishPond> FishPonds { get; set; }

    public virtual DbSet<KoiFish> KoiFishes { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server = .; database= FengShuiKoiConsultingSystem;uid=SA;pwd=12345;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__AppUser__1788CCACA96EAFB3");

            entity.ToTable("AppUser");

            entity.HasIndex(e => e.UserCode, "UQ__AppUser__1DF52D0CCE515A6F").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Fullname).HasMaxLength(50);
            entity.Property(e => e.Gender)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("SQL_Latin1_General_CP1_CS_AS");
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.UserCode).HasMaxLength(36);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("SQL_Latin1_General_CP1_CS_AS");

            entity.HasOne(d => d.Role).WithMany(p => p.AppUsers)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AppUser__RoleID__3A81B327");
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.BlogId).HasName("PK__Blog__54379E50CF42BCCB");

            entity.ToTable("Blog");

            entity.Property(e => e.BlogId).HasColumnName("BlogID");
            entity.Property(e => e.BlogTitle).HasMaxLength(200);
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.DestinyId).HasColumnName("DestinyID");
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Destiny).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.DestinyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blog__DestinyID__48CFD27E");

            entity.HasOne(d => d.User).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Blog__UserID__49C3F6B7");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__Comment__C3B4DFAA264C6A2F");

            entity.ToTable("Comment");

            entity.Property(e => e.CommentId).HasColumnName("CommentID");
            entity.Property(e => e.CreateDate).HasColumnType("datetime");
            entity.Property(e => e.DestinyId).HasColumnName("DestinyID");
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Destiny).WithMany(p => p.Comments)
                .HasForeignKey(d => d.DestinyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comment__Destiny__4CA06362");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comment__UserID__4D94879B");
        });

        modelBuilder.Entity<Destiny>(entity =>
        {
            entity.HasKey(e => e.DestinyId).HasName("PK__Destiny__533EF5B956DB0F06");

            entity.ToTable("Destiny");

            entity.Property(e => e.DestinyId).HasColumnName("DestinyID");
            entity.Property(e => e.DestitnyName).HasMaxLength(100);
        });

        modelBuilder.Entity<FishPond>(entity =>
        {
            entity.HasKey(e => e.FishPondId).HasName("PK__FishPond__4A21E16BA244BD59");

            entity.ToTable("FishPond");

            entity.Property(e => e.FishPondId).HasColumnName("FishPondID");
            entity.Property(e => e.DestinyId).HasColumnName("DestinyID");
            entity.Property(e => e.ImgUrl).HasColumnName("ImgURL");
            entity.Property(e => e.PondName).HasMaxLength(100);

            entity.HasOne(d => d.Destiny).WithMany(p => p.FishPonds)
                .HasForeignKey(d => d.DestinyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FishPond__Destin__4316F928");
        });

        modelBuilder.Entity<KoiFish>(entity =>
        {
            entity.HasKey(e => e.FishId).HasName("PK__KoiFish__F82A5BF9D309158D");

            entity.ToTable("KoiFish");

            entity.Property(e => e.FishId).HasColumnName("FishID");
            entity.Property(e => e.DestinyId).HasColumnName("DestinyID");
            entity.Property(e => e.FishName).HasMaxLength(100);
            entity.Property(e => e.ImgUrl).HasColumnName("ImgURL");

            entity.HasOne(d => d.Destiny).WithMany(p => p.KoiFishes)
                .HasForeignKey(d => d.DestinyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__KoiFish__Destiny__45F365D3");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.RateId).HasName("PK__Rating__58A7CCBC6A7D2D82");

            entity.ToTable("Rating");

            entity.Property(e => e.RateId).HasColumnName("RateID");
            entity.Property(e => e.BlogId).HasColumnName("BlogID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Blog).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.BlogId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rating__BlogID__5070F446");

            entity.HasOne(d => d.User).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rating__UserID__5165187F");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.RefreshTokenId).HasName("PK__RefreshT__F5845E594C301F56");

            entity.ToTable("RefreshToken");

            entity.HasIndex(e => e.RefreshTokenCode, "UQ__RefreshT__5FC54920AA85900E").IsUnique();

            entity.Property(e => e.RefreshTokenId).HasColumnName("RefreshTokenID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.ExpiresAt).HasColumnType("datetime");
            entity.Property(e => e.JwtId)
                .HasMaxLength(150)
                .HasColumnName("JwtID");
            entity.Property(e => e.RefreshTokenCode).HasMaxLength(36);
            entity.Property(e => e.RefreshTokenValue).HasMaxLength(255);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RefreshTo__UserI__3E52440B");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3A6C26FCF1");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
