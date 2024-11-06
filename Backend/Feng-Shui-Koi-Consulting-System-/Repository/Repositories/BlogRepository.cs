using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class BlogRepository : GenericRepository<Blog>, IBlogRepository
    {
        public BlogRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Blog>> GetAllBlogs(int? pageIndex = null, int? pageSize = null)
        {
            return await Get(pageIndex: pageIndex, pageSize: pageSize);
        }

        public async Task<Blog> GetBlogById(int id)
        {
            return await GetByID(id);
        }

        public async Task CreateBlog(Blog blog)
        {
            await Insert(blog);
        }

        public async Task UpdateBlog(Blog blog)
        {
            Update(blog);
        }

        public async Task DeleteBlog(int id)
        {
            Delete(id);
        }
    }

}
