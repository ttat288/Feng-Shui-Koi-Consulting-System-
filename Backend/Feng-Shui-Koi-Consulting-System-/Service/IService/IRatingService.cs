using Repository.Entities;
using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IRatingService
    {
        Task<IEnumerable<RatingDto>> GetRatings();
        Task<RatingDto> GetRatingById(int id);
        Task AddRating(RatingDto rating);
        Task UpdateRating(int id, RatingDto ratingDto);
        Task DeleteRating(int id);
        Task<IEnumerable<RatingDto>> GetRatingsByBlogId(int blogId);
        Task<IEnumerable<RatingDto>> GetRatingsByUserId(int userId);
        Task<int> CountRatingsByBlogId(int blogId);
        Task<bool> HasUserRatedBlog(int userId, int blogId);
    }
}
