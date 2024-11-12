using Repository.Entities;
using Service.Models.BlogDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogDetailsDto>> GetAllBlogDetails(int? pageIndex = null, int? pageSize = null);
        Task<BlogDetailsDto> GetFullBlogById(int id);
        Task<Blog> GetBlogById(int id);
        Task CreateBlog(Blog blog);
        Task UpdateBlog(Blog blog);
        Task DeleteBlog(int id);

    }
}
