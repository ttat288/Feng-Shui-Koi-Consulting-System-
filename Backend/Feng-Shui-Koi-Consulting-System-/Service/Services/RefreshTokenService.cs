﻿using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
using Repository.UnitOfWork;
using Service.ISerivice;
using Service.Models;

namespace Service.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RefreshTokenService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<RefreshTokenDTO?> CheckRefreshTokenByUserIdAsync(int userId)
        {
            var result = await _unitOfWork.RefreshTokenRepository.CheckRefreshTokenByUserIdAsync(userId);
            var mapdto = _mapper.Map<RefreshTokenDTO>(result);
            return mapdto;
        }

        public async Task<RefreshTokenDTO?> GetRefreshTokenAsync(string refreshTokenValue)
        {
            var result = await _unitOfWork.RefreshTokenRepository.GetRefreshTokenAsync(refreshTokenValue);
            var mapdto = _mapper.Map<RefreshTokenDTO>(result);
            return mapdto;
        }

        public TokenValidationParameters GetTokenValidationParameters()
        {
            var result = _unitOfWork.RefreshTokenRepository.GetTokenValidationParameters();
            return result;
        }

        public async Task<bool> RemoveRefreshTokenAsync(RefreshTokenDTO refreshToken)
        {
            var mapEntity = _mapper.Map<RefreshToken>(refreshToken);
            var result = await _unitOfWork.RefreshTokenRepository.RemoveRefreshTokenAsync(mapEntity);
            return result;
        }
    }
}
