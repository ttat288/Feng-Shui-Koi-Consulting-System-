using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiFishController : ControllerBase
    {
        private readonly IKoiFishService _koiFishService;

        public KoiFishController(IKoiFishService koiFishService)
        {
            _koiFishService = koiFishService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllKoiFish(int? pageIndex = null, int? pageSize = null)
        {
            var koiFishList = await _koiFishService.GetAllKoiFish(pageIndex, pageSize);
            return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Success", Data = koiFishList });
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetKoiFishById(int id)
        {
            var koiFish = await _koiFishService.GetKoiFishById(id);
            if (koiFish == null)
            {
                return NotFound(new { StatusCode = StatusCodes.Status404NotFound, Message = "Không tìm thấy KoiFish", Data = (object)null });
            }
            return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Success", Data = koiFish });
        }


        [HttpPost]
        public async Task<IActionResult> CreateKoiFish([FromBody] KoiFishCreateDto koiFishDto)
        {
            try
            {
                await _koiFishService.CreateKoiFish(koiFishDto);
                return Ok(new { StatusCode = StatusCodes.Status201Created, Message = "Tạo KoiFish thành công", Data = koiFishDto });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, Data = (object)null });
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKoiFish(int id, [FromBody] KoiFishUpdateDto koiFishDto)
        {
            try
            {
                await _koiFishService.UpdateKoiFish(id, koiFishDto);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Cập nhật KoiFish thành công", Data = koiFishDto });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, Data = (object)null });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKoiFish(int id)
        {
            try
            {
                await _koiFishService.DeleteKoiFish(id);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Xóa KoiFish thành công", Data = (object)null });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, Data = (object)null });
            }
        }
    }

}
