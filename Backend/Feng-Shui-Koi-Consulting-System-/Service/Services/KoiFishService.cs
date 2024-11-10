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
    public class KoiFishService : IKoiFishService
    {
        private readonly IKoiFishRepository _koiFishRepository;
        private readonly IDestinyRepository _destinyRepository;
        private readonly IUnitOfWork _unitOfWork;

        public KoiFishService(
            IKoiFishRepository koiFishRepository,
            IDestinyRepository destinyRepository,
            IUnitOfWork unitOfWork)
        {
            _koiFishRepository = koiFishRepository;
            _destinyRepository = destinyRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<KoiFish>> GetAllKoiFish(int? pageIndex = null, int? pageSize = null)
        {
            return await _koiFishRepository.GetAllKoiFish(pageIndex, pageSize);
        }

        public async Task<KoiFish> GetKoiFishById(int id)
        {
            return await _koiFishRepository.GetKoiFishById(id);
        }

        public async Task CreateKoiFish(KoiFishCreateDto koiFishDto)
        {
            // Kiểm tra sự tồn tại của DestinyId
            var destinyExists = await _destinyRepository.Exists(koiFishDto.DestinyId);
            if (!destinyExists)
            {
                throw new ArgumentException("DestinyId không tồn tại.");
            }

            // Tạo entity KoiFish từ DTO
            var koiFish = new KoiFish
            {
                FishName = koiFishDto.FishName,
                ImgUrl = koiFishDto.ImgUrl,
                Description = koiFishDto.Description,
                DestinyId = koiFishDto.DestinyId
            };

            // Lưu KoiFish mới vào cơ sở dữ liệu
            await _koiFishRepository.CreateKoiFish(koiFish);
            await _unitOfWork.SaveAsync();
        }

        public async Task UpdateKoiFish(int id, KoiFishUpdateDto koiFishDto)
        {
            // Kiểm tra sự tồn tại của DestinyId
            var destinyExists = await _destinyRepository.Exists(koiFishDto.DestinyId);
            if (!destinyExists)
            {
                throw new ArgumentException("DestinyId không tồn tại.");
            }

            // Lấy entity KoiFish từ database
            var koiFish = await _koiFishRepository.GetKoiFishById(id);
            if (koiFish == null)
            {
                throw new ArgumentException("KoiFish không tồn tại.");
            }

            // Cập nhật các thông tin của KoiFish
            koiFish.FishName = koiFishDto.FishName;
            koiFish.ImgUrl = koiFishDto.ImgUrl;
            koiFish.Description = koiFishDto.Description;
            koiFish.DestinyId = koiFishDto.DestinyId;

            _koiFishRepository.UpdateKoiFish(koiFish);
            await _unitOfWork.SaveAsync();
        }

        public async Task DeleteKoiFish(int id)
        {
            var koiFish = await _koiFishRepository.GetKoiFishById(id);
            if (koiFish == null)
            {
                throw new ArgumentException("KoiFish không tồn tại.");
            }

            _koiFishRepository.DeleteKoiFish(id);
            await _unitOfWork.SaveAsync();
        }
    }


}
