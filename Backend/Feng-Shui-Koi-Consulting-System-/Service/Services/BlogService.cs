using Repository.Entities;
using Repository.Interfaces;
using Repository.UnitOfWork;
using Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IDestinyRepository _destinyRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BlogService(
            IBlogRepository blogRepository,
            IAppUserRepository appUserRepository,
            IDestinyRepository destinyRepository,
            IUnitOfWork unitOfWork)
        {
            _blogRepository = blogRepository;
            _appUserRepository = appUserRepository;
            _destinyRepository = destinyRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Blog>> GetAllBlogs(int? pageIndex = null, int? pageSize = null)
        {
            return await _blogRepository.GetAllBlogs(pageIndex, pageSize);
        }

        public async Task<Blog> GetBlogById(int id)
        {
            return await _blogRepository.GetBlogById(id);
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
