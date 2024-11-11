using AutoMapper;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Repository.UnitOfWork;
using Service.IService;
using Service.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RatingService : IRatingService
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IBlogRepository _blogRepository;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public RatingService(IRatingRepository ratingRepository, IMapper mapper, IUnitOfWork unitOfWork, IBlogRepository blogRepository, IAppUserRepository appUserRepository)
        {
            _ratingRepository = ratingRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _blogRepository = blogRepository;
            _appUserRepository = appUserRepository;
        }

        private async Task ValidateUserExists(int userId)
        {
            var userExists = await _appUserRepository.GetUserById(userId);
            if (userExists == null)
            {
                throw new ArgumentException("UserId does not exist.");
            }
        }

        private async Task ValidateBlogExists(int blogId)
        {
            var blogExists = await _blogRepository.GetBlogById(blogId);
            if (blogExists == null)
            {
                throw new ArgumentException("BlogId does not exist.");
            }
        }

        public async Task<IEnumerable<RatingDto>> GetRatings()
        {
            var ratings = await _ratingRepository.GetAllRatings();
            return _mapper.Map<IEnumerable<RatingDto>>(ratings);
        }

        public async Task<RatingDto?> GetRatingById(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("ID not valid.");
            }

            var rating = await _ratingRepository.GetRatingById(id);
            return rating != null ? _mapper.Map<RatingDto>(rating) : null;
        }

        public async Task AddRating(RatingDto ratingDto)
        {
            if (ratingDto == null)
            {
                throw new ArgumentNullException(nameof(ratingDto), "Rating can't be null.");
            }

            if (ratingDto.BlogId <= 0 || ratingDto.UserId <= 0)
            {
                throw new ArgumentException("BlogId or UserId not valid.");
            }

            await ValidateUserExists(ratingDto.UserId);
            await ValidateBlogExists(ratingDto.BlogId);

            var existingRating = await _ratingRepository.GetRatingByUserAndBlogId(ratingDto.UserId, ratingDto.BlogId);
            if (existingRating != null)
            {
                throw new InvalidOperationException("You have already rated this blog.");
            }

            var rating = _mapper.Map<Rating>(ratingDto);
            await _ratingRepository.CreateRating(rating);
            await _unitOfWork.SaveAsync();
        }

        public async Task UpdateRating(int id, RatingDto ratingDto)
        {
            if (id <= 0)
            {
                throw new ArgumentException("ID not valid.");
            }

            if (ratingDto == null)
            {
                throw new ArgumentNullException(nameof(ratingDto), "Rating can't not be null.");
            }

            await ValidateUserExists(ratingDto.UserId);
            await ValidateBlogExists(ratingDto.BlogId);

            var ratingToUpdate = await _ratingRepository.GetRatingById(id);
            if (ratingToUpdate == null)
            {
                throw new ArgumentException("Rating does not exist.");
            }

            _mapper.Map(ratingDto, ratingToUpdate);
            _ratingRepository.UpdateRating(ratingToUpdate);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteRating(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("ID not valid.");
            }

            var rating = await _ratingRepository.GetRatingById(id);
            if (rating == null)
            {
                throw new ArgumentException("Rating does not exist.");
            }

            _ratingRepository.DeleteRating(id);
            await _unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<RatingDto>> GetRatingsByBlogId(int blogId)
        {
            if (blogId <= 0)
            {
                throw new ArgumentException("BlogId is not valid.");
            }

            await ValidateBlogExists(blogId);

            var ratings = await _ratingRepository.GetAllRatings();
            var filteredRatings = ratings.Where(r => r.BlogId == blogId);
            return _mapper.Map<IEnumerable<RatingDto>>(filteredRatings);
        }

        public async Task<IEnumerable<RatingDto>> GetRatingsByUserId(int userId)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("UserId is not valid.");
            }

            await ValidateUserExists(userId);

            var ratings = await _ratingRepository.GetAllRatings();
            var filteredRatings = ratings.Where(r => r.UserId == userId);
            return _mapper.Map<IEnumerable<RatingDto>>(filteredRatings);
        }

        public async Task<int> CountRatingsByBlogId(int blogId)
        {
            if (blogId <= 0)
            {
                throw new ArgumentException("BlogId is not valid.");
            }

            await ValidateBlogExists(blogId);

            var ratings = await _ratingRepository.GetAllRatings();
            return ratings.Count(r => r.BlogId == blogId);
        }
    }
}
