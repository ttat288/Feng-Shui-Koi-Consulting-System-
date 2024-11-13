using API.Common.Constants;
using API.Payloads;
using API.Payloads.Request.AppUser;
using API.Payloads.Responses;
using Microsoft.AspNetCore.Mvc;
using Service.ISerivice;
using Service.Models;

namespace API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {

        private readonly IAppUserService _appUserService;

        public AppUserController(IAppUserService appUserService)
        {
            _appUserService = appUserService;
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.AppUser.Add, Name = "AddUserAsync")]
        public async Task<IActionResult> AddAsync([FromBody] AddUserRequest reqObj)
        {
            try
            {
                var dto = new AppUserDTO();
                dto.UserName = reqObj.UserName;
                dto.Password = reqObj.UserPassword;
                dto.RoleId = reqObj.RoleId;
                dto.Phone = reqObj.Phone;
                dto.Gender = reqObj.Gender;
                dto.Fullname = reqObj.Fullname;
                dto.Dob = reqObj.Dob.HasValue ? DateOnly.FromDateTime(reqObj.Dob.Value) : null;
                var UserAdd = await _appUserService.Insert(dto);
                if (UserAdd == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Thêm không thành công",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status201Created,
                    Message = "Thêm người dùng thành công",
                    Data = UserAdd,
                    IsSuccess = true
                });


            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpDelete(APIRoutes.AppUser.Delete, Name = "DeleteUserAsync")]
        public async Task<IActionResult> DeleteAsynce([FromRoute] int id)
        {
            try
            {
                var result = await _appUserService.Delete(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy người dùng",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Xoá người dùng thành công",
                    Data = null,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPut(APIRoutes.AppUser.Update, Name = "UpdateUserAsync")]
        public async Task<IActionResult> UpdateUserAsync([FromRoute] int id,[FromBody] UpdateAppUserRequest reqObj)
        {
            try
            {
                var dto = new AppUserDTO();
                dto.IsActive = reqObj.IsActive;
                dto.Phone = reqObj.Phone;
                dto.Gender = reqObj.Gender;
                dto.Fullname = reqObj.Fullname;
                dto.Dob = reqObj.Dob.HasValue ? DateOnly.FromDateTime(reqObj.Dob.Value) : null;
                dto.UpdateBy = reqObj.UpdateBy;

                var result = await _appUserService.Update(id, dto);
                if (result == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy người dùng",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Cập nhật người dùng thành công",
                    Data = result,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.AppUser.GetAll, Name = "GetUsersAsync")]
        public async Task<IActionResult> GetAllAsync([FromQuery(Name = "currIdLogin")] int currIdLoginID
            , [FromQuery(Name = "searchKey")] string? searchKey
            , [FromQuery(Name = "pageNumber")] int pageNumber = Page.DefaultPageIndex
            , [FromQuery(Name = "pageSize")] int PageSize = Page.DefaultPageSize)
        {
            try
            {
                var allAccount = await _appUserService.Get(currIdLoginID, searchKey!,pageIndex: pageNumber, pageSize: PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tải dữ liệu thành công",
                    Data = allAccount,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.AppUser.GetByID, Name = "GetUserByID")]
        public async Task<IActionResult> GetAsync([FromRoute] int id)
        {
            try
            {
                var user = await _appUserService.GetByID(id);

                if (user == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy người dùng",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tìm người dùng thành công",
                    Data = user,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }
    }
}
