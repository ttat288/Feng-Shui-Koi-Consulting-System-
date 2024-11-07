using Repository.Interfaces;
using Service.IService;
using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class DestinyService : IDestinyService
    {
        private readonly IDestinyRepository _destinyRepository;
        private readonly IAppUserRepository _appUserRepository;

        public DestinyService(IDestinyRepository destinyRepository, IAppUserRepository appUserRepository)
        {
            _destinyRepository = destinyRepository;
            _appUserRepository = appUserRepository;
        }

        public async Task<DestinyResultDto> GetDestinyIdByUserId(int userId)
        {
            var user = await _appUserRepository.GetUserById(userId);
            if (user == null || user.Dob == null)
            {
                throw new ArgumentException("User không tồn tại.");
            }
            if (user.Dob == null) {
                throw new ArgumentException("Dob không có giá trị.");
            }

            // Tính mệnh của người dùng dựa trên năm sinh
            string destinyName = CalculateDestinyByYear(user.Dob.Value.Year, user.Gender);

            // Tìm DestinyId tương ứng với tên mệnh
            var destiny = await _destinyRepository.FindByName(destinyName);
            if (destiny == null)
            {
                throw new ArgumentException("Không tìm thấy mệnh tương ứng.");
            }

            return new DestinyResultDto
            {
                DestinyId = destiny.DestinyId,
                DestinyName = destiny.DestitnyName
            };
        }

        public async Task<DestinyResultDto> GetDestinyName(int year, string gender)
        {
            if (year < 1950 || year > DateTime.Now.Year)
            {
                throw new ArgumentException("Năm không được nhỏ hơn 1950 hoặc lớn hơn " + DateTime.Now.Year);
            }

            if (gender.ToLower() != "male" && gender.ToLower() != "female")
            {
                throw new ArgumentException("Giới tính phải là nam(Male/male) hoặc nữ(Female/female)");
            }
            string destinyName = CalculateDestinyByYear(year, gender);
            var destiny = await _destinyRepository.FindByName(destinyName);
            if (destiny == null)
            {
                throw new ArgumentException("Không tìm thấy mệnh tương ứng.");
            }
            return new DestinyResultDto
            {
                DestinyId = destiny.DestinyId,
                DestinyName = destiny.DestitnyName
            };

        }

            private string CalculateDestinyByYear(int year, string gender)
        {
            int lunarYear = year % 9;
            string destiny = "";
            switch (lunarYear)
            {
                case 0:
                    destiny = gender.ToLower() == "male" ? "Thủy" : "Kim";
                    break;
                case 1:
                    destiny = gender.ToLower() == "male" ? "Hỏa" : "Mộc";
                    break;
                case 2:
                    destiny = gender.ToLower() == "male" ? "Thổ" : "Thủy";
                    break;
                case 3:
                    destiny = gender.ToLower() == "male" ? "Mộc" : "Hỏa";
                    break;
                case 4:
                    destiny = gender.ToLower() == "male" ? "Kim" : "Thổ";
                    break;
                case 5:
                    destiny = gender.ToLower() == "male" ? "Thủy" : "Kim";
                    break;
                case 6:
                    destiny = gender.ToLower() == "male" ? "Hỏa" : "Mộc";
                    break;
                case 7:
                    destiny = gender.ToLower() == "male" ? "Thổ" : "Thủy";
                    break;
                case 8:
                    destiny = gender.ToLower() == "male" ? "Mộc" : "Hỏa";
                    break;
                default:
                    destiny = "Không xác định";
                    break;
            }

            return destiny;
        }
    }
}
