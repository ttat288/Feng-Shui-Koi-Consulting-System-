using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IBlogRepository
    {
        Task<IEnumerable<Blog>> GetAllBlogs(int? pageIndex = null, int? pageSize = null);
        Task<Blog> GetBlogById(int id);
        Task CreateBlog(Blog blog);
        Task UpdateBlog(Blog blog);
        Task DeleteBlog(int id);
    }
}
