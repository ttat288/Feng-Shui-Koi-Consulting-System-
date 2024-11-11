using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Repository.Common.Enums;
using Repository.Entities;
using Repository.UnitOfWork;
using Service.ISerivice;
using Service.Models;
using Service.Models.Pagination;
using Service.Utils;
using System.Linq.Expressions;

namespace Service.Services
{
    public class AppUserService : IAppUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AppUserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<int> Count()
        {
            Expression<Func<AppUser, bool>> filter = x => x.Status != (int)Status.Deleted;
            return await _unitOfWork.AppUserRepository.Count(filter: filter);
        }

        public async Task<bool> Delete(int id)
        {
            var deleteAppUser = await _unitOfWork.AppUserRepository.GetByID(id);
            if (deleteAppUser == null)
            {
                return false;
            }
            deleteAppUser.Status = (int)Status.Deleted;

            _unitOfWork.AppUserRepository.Update(deleteAppUser);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<PageEntity<AppUserDTO>> Get(int currentIDLogin, string? searchKey, int? pageIndex = null, int? pageSize = null)
        {
            
            Expression<Func<AppUser, bool>> filter;


                filter = searchKey != null
                    ? x => x.UserName.Contains(searchKey) && x.RoleId != (int)UserRole.Admin && !(x.Status == (int)Status.Deleted)
                    : x => x.RoleId != (int)UserRole.Admin && !(x.Status == (int)Status.Deleted);
            

            Func<IQueryable<AppUser>, IOrderedQueryable<AppUser>> orderBy = q => q.OrderByDescending(x => x.UserId);
            string includeProperties = "Role";

            var entities = _unitOfWork.AppUserRepository.Get(currentIDLogin, filter: filter, orderBy: orderBy, includeProperties: includeProperties, pageIndex: pageIndex, pageSize: pageSize).ToList();
            var pagin = new PageEntity<AppUserDTO>();
            pagin.List = _mapper.Map<IEnumerable<AppUserDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.AppUserRepository.Count(filter);
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<AppUserDTO?> GetByID(int id)
        {
            Expression<Func<AppUser, bool>> condition = x => x.UserId == id && (x.Status != (int)Status.Deleted);
            var entity = await _unitOfWork.AppUserRepository.GetByCondition(condition, "Role");
            if (entity == null)
            {
                return null!;
            }
            return _mapper?.Map<AppUserDTO?>(entity);
        }
        public async Task<AppUserDTO?> GetUserByEmailAsync(string gmail)
        {
            Expression<Func<AppUser, bool>> condition = x => x.UserName == gmail;
            var entity = await _unitOfWork.AppUserRepository.GetByCondition(condition, "Role");
            if (entity == null)
            {
                return null!;
            }
            return _mapper?.Map<AppUserDTO?>(entity);
        }

        public async Task<AppUserDTO> Insert(AppUserDTO dto)
        {
            var user = _mapper.Map<AppUser>(dto);
            user.UserCode = Guid.NewGuid().ToString();
            user.Status = (int)Status.Exist;
            user.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            user.Password = dto.Password != null ? PasswordHelper.ConvertToEncrypt(dto.Password) : string.Empty;
            user.IsActive = true;

            Expression<Func<AppUser, bool>> duplicateName = x => x.UserName.Equals(user.UserName) && (x.Status != (int)Status.Deleted);
            var exist = await _unitOfWork.AppUserRepository.GetByCondition(duplicateName);
            if (exist != null)
            {
                throw new DbUpdateException("Username đã tồn tại");
            }
            var newUser = await _unitOfWork.AppUserRepository.Insert(user);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            if (result && newUser != null)
            {
                return _mapper.Map<AppUserDTO>(newUser);
            }
            return null!;
        }

        public async Task<bool> Update(int id, AppUserDTO entityToUpdate)
        {
            Expression<Func<AppUser, bool>> condition = x => x.UserId == id && (x.Status != (int)Status.Deleted);
            var updateAppUser = await _unitOfWork.AppUserRepository.GetByCondition(condition);
            if (updateAppUser == null)
            {
                return false;
            }
            if (!string.IsNullOrEmpty(entityToUpdate.Password))
            {
                updateAppUser.Password = PasswordHelper.ConvertToEncrypt(entityToUpdate.Password);
            }

            if (entityToUpdate.Status != default)
            {
                updateAppUser.Status = entityToUpdate.Status;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Fullname))
            {
                updateAppUser.Fullname = entityToUpdate.Fullname;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Phone))
            {
                updateAppUser.Phone = entityToUpdate.Phone;
            }

            if (entityToUpdate.Dob.HasValue)
            {
                updateAppUser.Dob = entityToUpdate.Dob.Value;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Gender))
            {
                updateAppUser.Gender = entityToUpdate.Gender;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Gender))
            {
                updateAppUser.Gender = entityToUpdate.Gender;
            }


            updateAppUser.IsActive = entityToUpdate.IsActive;


            if (entityToUpdate.UpdateBy != default)
            {
                updateAppUser.UpdateBy = entityToUpdate.UpdateBy;
            }

            updateAppUser.UpdateDate = DateOnly.FromDateTime(DateTime.Now);

            _unitOfWork.AppUserRepository.Update(updateAppUser);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }
    }
}
