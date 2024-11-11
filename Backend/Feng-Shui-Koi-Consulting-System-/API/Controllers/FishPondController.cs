using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.IService;
using Service.Models;
using Service.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FishPondController : ControllerBase
    {
        private readonly IFishPondService _fishPondService;

        public FishPondController(IFishPondService fishPondService)
        {
            _fishPondService = fishPondService;
        }

        // GET: api/FishPond
        [HttpGet]
        public async Task<IActionResult> GetAllFishPonds(int? pageIndex = null, int? pageSize = null)
        {
            var fishPonds = await _fishPondService.GetAllFishPonds(pageIndex, pageSize);
            return Ok(new { StatusCode = 200, Message = "Success", Data = fishPonds });
        }

        // GET: api/FishPond/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFishPondById(int id)
        {
            var fishPond = await _fishPondService.GetFishPondById(id);
            if (fishPond == null)
            {
                return NotFound(new { StatusCode = 404, Message = "Không tìm thấy hồ cá", Data = (object)null });
            }
            return Ok(new { StatusCode = 200, Message = "Success", Data = fishPond });
        }

        // POST: api/FishPond
        [HttpPost]
        public async Task<IActionResult> CreateFishPond([FromBody] FishPondCreateDto fishPond)
        {
            try
            {
                await _fishPondService.CreateFishPond(fishPond);
                return Ok(new { StatusCode = StatusCodes.Status201Created, Message = "Tạo FishPond thành công", Data = fishPond });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, Data = (object)null });
            }
        }

        // PUT: api/FishPond/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFishPond(int id, [FromBody] FishPondUpdateDto fishPond)
        {
            try
            {
                await _fishPondService.UpdateFishPond(id, fishPond);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Cập nhật hồ cá thành công", Data = fishPond });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, Data = (object)null });
            }
        }

        // DELETE: api/FishPond/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFishPond(int id)
        {
            try
            {
                await _fishPondService.DeleteFishPond(id);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Xóa hồ cá thành công", Data = (object)null });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, Data = (object)null });
            }
        }
    }

}
