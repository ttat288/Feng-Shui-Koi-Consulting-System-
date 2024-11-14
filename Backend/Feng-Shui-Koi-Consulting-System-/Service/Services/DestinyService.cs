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
        private readonly IKoiFishRepository _koiFishRepository;
        private readonly IFishPondRepository _fishPondRepository;

        public DestinyService(IDestinyRepository destinyRepository, IAppUserRepository appUserRepository,
            IKoiFishRepository koiFishRepository, IFishPondRepository fishPondRepository)
        {
            _destinyRepository = destinyRepository;
            _appUserRepository = appUserRepository;
            _koiFishRepository = koiFishRepository;
            _fishPondRepository = fishPondRepository;
        }

        public async Task<DestinyResultDto> GetDestinyIdByUserId(int userId)
        {
            var user = await _appUserRepository.GetUserById(userId);
            if (user == null || user.Dob == null)
            {
                throw new ArgumentException("User không tồn tại.");
            }
            if (user.Dob == null)
            {
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

        public async Task<DestinyRmdDto> GetDestinyName(int year)
        {
            if (year < 1950 || year > DateTime.Now.Year)
            {
                throw new ArgumentException("Năm không được nhỏ hơn 1950 hoặc lớn hơn " + DateTime.Now.Year);
            }

            //if (gender.ToLower() != "male" && gender.ToLower() != "female")
            //{
            //    throw new ArgumentException("Giới tính phải là nam(Male/male) hoặc nữ(Female/female)");
            //}
            string destinyName = CalculateDestiny(year);
            var destiny = await _destinyRepository.FindByName(destinyName);
            if (destiny == null)
            {
                throw new ArgumentException("Không tìm thấy mệnh tương ứng.");
            }

            var koi = await _koiFishRepository.GetAllKoiFish();
            var pond = await _fishPondRepository.GetAllFishPonds();
            return new DestinyRmdDto
            {
                DestinyId = destiny.DestinyId,
                DestinyName = destiny.DestitnyName,
                KoiFishList = koi.Where(k => k.DestinyId == destiny.DestinyId)
                         .Select(k => new KoiFishDto
                         {
                             FishId = k.FishId,
                             FishName = k.FishName,
                             ImgUrl = k.ImgUrl,
                             Description = k.Description
                         })
                         .ToList() ?? new List<KoiFishDto>(),

                FishPondList = pond.Where(p => p.DestinyId == destiny.DestinyId)
                           .Select(p => new FishPondDto
                           {
                               FishPondId = p.FishPondId,
                               PondName = p.PondName,
                               ImgUrl = p.ImgUrl,
                               Description = p.Description
                           })
                           .ToList() ?? new List<FishPondDto>()

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
        private string CalculateDestiny(int year)
        {
            int canValue = GetCanValue(year);
            int chiValue = GetChiValue(year);
            int combinedValue = (canValue + chiValue);
            if (combinedValue > 5)
            {
                combinedValue = combinedValue - 5;
            }
            string[] elements = { " ","Kim", "Thủy", "Hỏa", "Thổ", "Mộc" };
            return elements[combinedValue];
        }

        private int GetCanValue(int year)
        {
            int lastDigit = year % 10;
            return lastDigit switch
            {
                0 => 4, // Canh
                1 => 4, // Tân
                2 => 5, // Nhâm
                3 => 5, // Quý
                4 => 1, // Giáp
                5 => 1, // Ất
                6 => 2, // Bính
                7 => 2, // Đinh
                8 => 3, // Mậu
                9 => 3, // Kỷ
                _ => throw new InvalidOperationException("Không xác định Can.")
            };
        }

        private int GetChiValue(int year)
        {
            int chiIndex = (year%100)%12;
            return chiIndex switch
            {
                0 => 0, // Tý, Sửu, Ngọ, Mùi
                1 => 0, // Dần, Mão, Thân, Dậu
                2 => 0, // Thìn, Tỵ, Tuất, Hợi
                3 => 0,
                4 => 1,
                5 => 1,
                6 => 1,
                7 => 1,
                8 => 2,
                9 => 2,
                10 => 2,
                11 => 2,
                _ => throw new InvalidOperationException("Không xác định Chi.")
            };
        }
    }
}
