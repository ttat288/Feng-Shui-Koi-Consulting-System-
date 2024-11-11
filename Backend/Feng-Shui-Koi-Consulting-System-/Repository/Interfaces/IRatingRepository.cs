using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRatingRepository
    {
        Task<IEnumerable<Rating>> GetAllRatings();
        Task<Rating> GetRatingById(int id);
        Task CreateRating(Rating rating);
        Task UpdateRating(Rating rating);
        Task DeleteRating(int id);
        Task<Rating?> GetRatingByUserAndBlogId(int userId, int blogId);
    }
}
