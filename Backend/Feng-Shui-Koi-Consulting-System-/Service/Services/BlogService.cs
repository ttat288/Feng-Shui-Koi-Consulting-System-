using Repository.Entities;
using Repository.Interfaces;
using Repository.UnitOfWork;
using Service.IService;
using Service.Models;
using Service.Models.BlogDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Service.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IDestinyRepository _destinyRepository;
        private readonly IRatingRepository _ratingRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BlogService(
            IBlogRepository blogRepository,
            IAppUserRepository appUserRepository,
            IDestinyRepository destinyRepository,
            IRatingRepository ratingRepository,
            IUnitOfWork unitOfWork)
        {
            _blogRepository = blogRepository;
            _appUserRepository = appUserRepository;
            _destinyRepository = destinyRepository;
            _ratingRepository = ratingRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<BlogDetailsDto>> GetAllBlogDetails(int? pageIndex = null, int? pageSize = null)
        {
            var blogs = await _blogRepository.GetAllBlogs(pageIndex, pageSize);

            var blogDetailsList = new List<BlogDetailsDto>();

            foreach (var blog in blogs)
            {
                var user = await _appUserRepository.GetUserById(blog.UserId);
                var destiny = await _destinyRepository.GetDestinyById(blog.DestinyId);
                var ratingsCount = await CountRatingsByBlogId(blog.BlogId);

                var blogDetails = new BlogDetailsDto
                {
                    BlogId = blog.BlogId,
                    BlogTitle = blog.BlogTitle,
                    BlogImg = blog.BlogImg,
                    BlogData = blog.BlogData,
                    CreateDate = blog.CreateDate,
                    UpdateDate = blog.UpdateDate,
                    Status = blog.Status,

                    Destiny = new DestinyDto
                    {
                        DestinyId = blog.DestinyId,
                        Name = destiny.DestitnyName
                    },

                    User = new UserDto
                    {
                        UserId = blog.UserId,
                        UserCode = user.UserCode,
                        UserName = user.UserName,
                        Password = user.Password,
                        RoleId = user.RoleId,
                        CreateDate = user.CreateDate,
                        IsActive = user.IsActive,
                        Status = user.Status,
                        Fullname = user.Fullname,
                        Phone = user.Phone,
                        Dob = user.Dob,
                        Gender = user.Gender,
                        UpdateBy = user.UpdateBy,
                        UpdateDate = user.UpdateDate
                    },

                    Ratings = new BlogRatingDto
                    {
                        Rating = ratingsCount
                    }
                };

                blogDetailsList.Add(blogDetails);
            }

            return blogDetailsList;
        }


        public async Task<BlogDetailsDto> GetFullBlogById(int id)
        {
            var blog = await _blogRepository.GetBlogById(id);
            if (blog == null)
            {
                throw new ArgumentException("Không tìm thấy blog.");
            }

            var user = await _appUserRepository.GetUserById(blog.UserId);
            if (user == null)
            {
                throw new ArgumentException("Không tìm thấy user của blog này");
            }

            var destiny = await _destinyRepository.GetDestinyById(blog.DestinyId);
            if (destiny == null)
            {
                throw new ArgumentException("Không tìm thấy destiny của blog này");
            }

            var blogData = new BlogDetailsDto
            {
                BlogId = blog.BlogId,
                BlogTitle = blog.BlogTitle,
                BlogImg = blog.BlogImg,
                BlogData = blog.BlogData,
                CreateDate = blog.CreateDate,
                UpdateDate = blog.UpdateDate,
                Status = blog.Status,
                //DestinyId = blog.DestinyId,
                //UserId = blog.UserId,

                Destiny = new DestinyDto
                {
                    DestinyId = blog.DestinyId,
                    Name = destiny.DestitnyName
                },
                User = new UserDto
                {
                    UserId = blog.UserId,
                    UserCode = user.UserCode,
                    UserName = user.UserName,
                    Password = user.Password,
                    RoleId = user.RoleId,
                    CreateDate = user.CreateDate,
                    IsActive = user.IsActive,
                    Status = user.Status,
                    Fullname = user.Fullname,
                    Phone = user.Phone,
                    Dob = user.Dob,
                    Gender = user.Gender,
                    UpdateBy = user.UpdateBy,
                    UpdateDate = user.UpdateDate
                },
                Ratings = new BlogRatingDto
                {
                    Rating = await CountRatingsByBlogId(blog.BlogId),
                },

            };

            return blogData;
        }


        public async Task<Blog> GetBlogById(int id)
        {
            return await _blogRepository.GetBlogById(id);
        }



        public async Task<int> CountRatingsByBlogId(int blogId)
        {
            var blog = await _blogRepository.GetBlogById(blogId);
            if (blog == null)
            {
                throw new ArgumentException("Không tìm thấy blog khi tính rating.");
            }

            var ratings = await _ratingRepository.GetAllRatings();
            return ratings.Count(r => r.BlogId == blogId);
        }


        public async Task CreateBlog(Blog blog)
        {
            // Tạo GUID cho BlogId (mã hóa thành dạng số nguyên nếu cần)
            //blog.BlogId = Guid.NewGuid().GetHashCode();

            // Kiểm tra RoleId của User (RoleId phải là 2)
            var user = await _appUserRepository.GetUserById(blog.UserId);
            if (user == null || user.RoleId != 2)
            {
                throw new UnauthorizedAccessException("User không có quyền tạo blog.");
            }

            // Kiểm tra sự tồn tại của DestinyId
            var destinyExists = await _destinyRepository.Exists(blog.DestinyId);
            if (!destinyExists)
            {
                throw new ArgumentException("DestinyId không tồn tại.");
            }

            // Thiết lập các giá trị mặc định cho Blog
            blog.CreateDate = DateTime.Now;  // Ngày hiện tại
            blog.Status = 1;                 // Trạng thái mặc định là 1

            // Lưu Blog mới vào cơ sở dữ liệu
            await _blogRepository.CreateBlog(blog);
            await _unitOfWork.SaveAsync();
        }

        public async Task UpdateBlog(Blog blog)
        {

            var user = await _appUserRepository.GetUserById(blog.UserId);
            if (user == null || user.RoleId != 2)
            {
                throw new UnauthorizedAccessException("User không có quyền tạo blog.");
            }


            var destinyExists = await _destinyRepository.Exists(blog.DestinyId);
            if (!destinyExists)
            {
                throw new ArgumentException("DestinyId không tồn tại.");
            }


            blog.UpdateDate = DateTime.Now;
            blog.Status = 1;

            _blogRepository.UpdateBlog(blog);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteBlog(int id)
        {
            _blogRepository.DeleteBlog(id);
            await _unitOfWork.SaveAsync();
        }
    }


}
