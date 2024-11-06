using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.IService;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinyController : ControllerBase
    {
        private readonly IDestinyService _destinyService;

        public DestinyController(IDestinyService destinyService)
        {
            _destinyService = destinyService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetDestinyByUserId(int userId)
        {
            try
            {
                var destiny = await _destinyService.GetDestinyIdByUserId(userId);
                if (destiny == null)
                {
                    return NotFound(new { StatusCode = StatusCodes.Status404NotFound, Message = "Không tìm thấy mệnh cho người dùng này.", DestinyId = (object)null });
                }

                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Successful", DestinyId = destiny });
            }
            catch (Exception ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message, DestinyId = (object)null });
            }
        }

    }
}
