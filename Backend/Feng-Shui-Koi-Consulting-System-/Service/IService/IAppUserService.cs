﻿using Service.Models;
using Service.Models.Pagination;

namespace Service.ISerivice
{
    public interface IAppUserService
    {
        Task<PageEntity<AppUserDTO>> Get(
            int currentIDLogin,
            string searchKye,
            int? pageIndex = null, // Optional parameter for pagination (page number)
            int? pageSize = null); // Optional parameter for pagination (number of records per page)

        Task<AppUserDTO?> GetByID(int id);

        Task<AppUserDTO> Insert(AppUserDTO entity);

        Task<bool> Delete(int id);

        Task<AppUserDTO> Update(int id, AppUserDTO entityToUpdate);

        Task<int> Count();
        Task<AppUserDTO> GetUserByEmailAsync(string gmail);

    }
}
