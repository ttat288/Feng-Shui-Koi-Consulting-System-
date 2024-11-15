using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;

namespace Repository.Repositories
{
    public class RatingRepository : GenericRepository<Rating>, IRatingRepository
    {
        public RatingRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Rating>> GetAllRatings()
        {
            return await GetAllNoPaging(
                includeProperties: "Blog,User");
        }

        public async Task<Rating> GetRatingById(int id)
        {
            return await GetByID(id);
        }

        public async Task CreateRating(Rating rating)
        {
            await Insert(rating);
        }

        public async Task UpdateRating(Rating rating)
        {
            Update(rating);
        }

        public async Task DeleteRating(int id)
        {
            Delete(id);
        }
        public async Task<Rating?> GetRatingByUserAndBlogId(int userId, int blogId)
        {
            return await context.Ratings
                .FirstOrDefaultAsync(r => r.UserId == userId && r.BlogId == blogId);
        }
        public async Task<bool> HasUserRatedBlog(int userId, int blogId)
        {
            return await context.Ratings.AnyAsync(r => r.UserId == userId && r.BlogId == blogId);
        }
    }
}