using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.IService;
using Service.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        // GET: api/Blog
        [HttpGet]
        public async Task<IActionResult> GetAllBlogs(int? pageIndex = null, int? pageSize = null)
        {
            var blogs = await _blogService.GetAllBlogs(pageIndex, pageSize);
            return Ok(new { StatusCode = 200, Message = "Thành công", Data = blogs });
        }

        // GET: api/Blog/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            var blog = await _blogService.GetBlogById(id);
            if (blog == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Không tìm thấy blog", Data = (object)null });
            }
            return Ok(new { StatusCode = 200, Message = "Thành công", Data = blog });
        }

        // POST: api/Blog
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody] BlogCreateDto blogDto)
        {
            var blog = new Blog
            {
                BlogTitle = blogDto.BlogTitle,
                BlogData = blogDto.BlogData,
                DestinyId = blogDto.DestinyId,
                UserId = blogDto.UserId
            };

            try
            {
                await _blogService.CreateBlog(blog);
                return Ok(new { StatusCode = 201, Message = "Tạo blog thành công", Data = blog });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { StatusCode = 401, Message = ex.Message, Data = (object)null });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = 400, Message = ex.Message, Data = (object)null });
            }
        }

        // PUT: api/Blog/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromBody] BlogUpdateDto blogDto)
        {
            var existingBlog = await _blogService.GetBlogById(id);
            if (existingBlog == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Không tìm thấy blog để cập nhật", Data = (object)null });
            }

            existingBlog.BlogTitle = blogDto.BlogTitle;
            existingBlog.BlogData = blogDto.BlogData;
            existingBlog.DestinyId = blogDto.DestinyId;
            existingBlog.UserId = blogDto.UserId;

            try
            {
                await _blogService.UpdateBlog(existingBlog);
                return Ok(new { StatusCode = 200, Message = "Cập nhật blog thành công", Data = existingBlog });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { StatusCode = 401, Message = ex.Message, Data = (object)null });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = 400, Message = ex.Message, Data = (object)null });
            }
        }

        // DELETE: api/Blog/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var existingBlog = await _blogService.GetBlogById(id);
            if (existingBlog == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Không tìm thấy blog để xóa", Data = (object)null });
            }

            await _blogService.DeleteBlog(id);
            return Ok(new { StatusCode = 200, Message = "Xóa blog thành công", Data = (object)null });
        }

    }
}
