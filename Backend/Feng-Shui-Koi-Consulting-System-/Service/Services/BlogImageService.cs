using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Service.Services
{
    public class BlogImageService
    {
        private readonly string _bucketName;
        private readonly IAmazonS3 _s3Client;

        public BlogImageService(IConfiguration configuration)
        {
            _bucketName = configuration["AWS:BucketName"];
            var accessKey = configuration["AWS:AccessKey"];
            var secretKey = configuration["AWS:SecretKey"];
            var region = configuration["AWS:Region"];

            // Khởi tạo client AWS S3 với các thông tin từ appsettings.json
            _s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));
        }

        public async Task<string> ProcessBlogDataAsync(string blogData)
        {
            string pattern = @"data:image/(?<type>png|jpg|jpeg|gif);base64,(?<data>[A-Za-z0-9+/=]+)";
            var regex = new Regex(pattern);
            var matches = regex.Matches(blogData);

            foreach (Match match in matches)
            {
                string imageType = match.Groups["type"].Value;
                string base64Data = match.Groups["data"].Value;

                byte[] imageBytes;
                try
                {
                    // Cố gắng chuyển đổi base64 thành byte[]
                    imageBytes = Convert.FromBase64String(base64Data);
                }
                catch (FormatException ex)
                {
                    // Nếu không thể chuyển đổi base64, throw lỗi
                    throw new ArgumentException("Không thể chuyển đổi base64 thành hình ảnh.", ex);
                }

                string fileName = $"{Guid.NewGuid()}.{imageType}";

                string imageUrl;
                try
                {
                    // Upload hình ảnh lên S3 và nhận URL
                    imageUrl = await UploadImageToS3Async(imageBytes, fileName);
                }
                catch (AmazonS3Exception s3Ex)
                {
                    // Nếu có lỗi khi upload hình ảnh, throw lỗi với chi tiết từ AWS S3
                    string s3ErrorMessage = $"Lỗi khi upload hình ảnh lên S3. S3 Error: {s3Ex.Message}, Error Code: {s3Ex.ErrorCode}, Request ID: {s3Ex.RequestId}";
                    throw new ArgumentException(s3ErrorMessage, s3Ex);
                }
                catch (Exception ex)
                {
                    // Nếu có lỗi khác, throw lỗi chung với thông tin chi tiết
                    string generalErrorMessage = $"Lỗi không xác định khi upload hình ảnh lên S3. Error: {ex.Message}";
                    throw new ArgumentException(generalErrorMessage, ex);
                }

                blogData = blogData.Replace(match.Value, imageUrl);
            }

            return blogData;
        }

        private async Task<string> UploadImageToS3Async(byte[] imageBytes, string fileName)
        {
            try
            {
                using (var ms = new MemoryStream(imageBytes))
                {
                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = ms,
                        Key = fileName,
                        BucketName = _bucketName,
                        //CannedACL = S3CannedACL.PublicRead
                    };

                    var fileTransferUtility = new TransferUtility(_s3Client);
                    // Thực hiện upload hình ảnh lên S3
                    await fileTransferUtility.UploadAsync(uploadRequest);
                    return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
                }
            }
            catch (AmazonS3Exception s3Ex)
            {
                // Nếu có lỗi với S3, throw lỗi với thông tin chi tiết
                string s3ErrorMessage = $"S3 Upload Error: {s3Ex.Message}, Error Code: {s3Ex.ErrorCode}, Request ID: {s3Ex.RequestId}, Status Code: {s3Ex.StatusCode}";
                throw new ArgumentException(s3ErrorMessage, s3Ex);
            }
            catch (Exception ex)
            {
                // Nếu có lỗi khác, throw lỗi chung với thông tin chi tiết
                string generalErrorMessage = $"Lỗi không xác định khi upload hình ảnh lên S3. Error: {ex.Message}, Stack Trace: {ex.StackTrace}";
                throw new ArgumentException(generalErrorMessage, ex);
            }

        }

    }
}
