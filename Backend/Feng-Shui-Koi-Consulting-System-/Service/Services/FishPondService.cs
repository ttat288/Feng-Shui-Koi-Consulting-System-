using Repository.Entities;
using Repository.Interfaces;
using Repository.UnitOfWork;
using Service.IService;
using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class FishPondService : IFishPondService
    {
        private readonly IFishPondRepository _fishPondRepository;
        private readonly IDestinyRepository _destinyRepository;
        private readonly IUnitOfWork _unitOfWork;

        public FishPondService(
            IFishPondRepository fishPondRepository,
            IDestinyRepository destinyRepository,
            IUnitOfWork unitOfWork)
        {
            _fishPondRepository = fishPondRepository;
            _destinyRepository = destinyRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<FishPond>> GetAllFishPonds(int? pageIndex = null, int? pageSize = null)
        {
            return await _fishPondRepository.GetAllFishPonds(pageIndex, pageSize);
        }

        public async Task<FishPond> GetFishPondById(int id)
        {
            return await _fishPondRepository.GetFishPondById(id);
        }

        public async Task CreateFishPond(FishPondCreateDto fishPondDto)
        {
            // Kiểm tra sự tồn tại của DestinyId
            var destinyExists = await _destinyRepository.Exists(fishPondDto.DestinyId);
            if (!destinyExists)
            {
                throw new ArgumentException("DestinyId không tồn tại.");
            }

            // Tạo entity FishPond từ DTO
            var fishPond = new FishPond
            {
                PondName = fishPondDto.PondName ?? throw new ArgumentException("Tên hồ cá trống."),
                ImgUrl = fishPondDto.ImgUrl,
                Description = fishPondDto.Description,
                DestinyId = fishPondDto.DestinyId
            };

            // Lưu FishPond mới vào cơ sở dữ liệu
            await _fishPondRepository.CreateFishPond(fishPond);
            await _unitOfWork.SaveAsync();
        }

        public async Task UpdateFishPond(int id, FishPondUpdateDto fishPondDto)
        {
            // Kiểm tra sự tồn tại của DestinyId
            var destinyExists = await _destinyRepository.Exists(fishPondDto.DestinyId);
            if (!destinyExists)
            {
                throw new ArgumentException("DestinyId không tồn tại.");
            }

            // Lấy entity FishPond từ database
            var fishPond = await _fishPondRepository.GetFishPondById(id);
            if (fishPond == null)
            {
                throw new ArgumentException("FishPond không tồn tại.");
            }

            // Cập nhật các thông tin của FishPond
            fishPond.PondName = fishPondDto.PondName ?? throw new ArgumentException("Tên hồ cá trống."); // Gán tên nếu null
            fishPond.ImgUrl = fishPondDto.ImgUrl;
            fishPond.Description = fishPondDto.Description;
            fishPond.DestinyId = fishPondDto.DestinyId;

            _fishPondRepository.UpdateFishPond(fishPond);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteFishPond(int id)
        {
            var fishPond = await _fishPondRepository.GetFishPondById(id);
            if (fishPond == null)
            {
                throw new ArgumentException("FishPond không tồn tại.");
            }

            _fishPondRepository.DeleteFishPond(id);
            await _unitOfWork.SaveAsync();
        }
    }

}
