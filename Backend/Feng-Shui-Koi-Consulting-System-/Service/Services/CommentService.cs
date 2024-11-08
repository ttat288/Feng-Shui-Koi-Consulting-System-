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
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IDestinyRepository _destinyRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CommentService(
            ICommentRepository commentRepository,
            IAppUserRepository appUserRepository,
            IDestinyRepository destinyRepository,
            IUnitOfWork unitOfWork)
        {
            _commentRepository = commentRepository;
            _appUserRepository = appUserRepository;
            _destinyRepository = destinyRepository;
            _unitOfWork = unitOfWork;
        }



        public async Task<Comment> CreateComment(CreateCommentDto createCommentDto)
        {
            if (!await IsValidUserId(createCommentDto.UserId))
            {
                throw new Exception("UserId không tìm thấy");
            }

            if (!await IsValidDestinyId(createCommentDto.DestinyId))
            {
                throw new Exception("DestinyId không tìm thấy");
            }

            var comment = new Comment
            {
                CommentData = createCommentDto.CommentData,
                UserId = createCommentDto.UserId,
                DestinyId = createCommentDto.DestinyId,
                Status = 1,
                CreateDate = DateTime.Now
            };

            await _commentRepository.InsertComment(comment);
            await _unitOfWork.SaveAsync();
            return comment;
        }

        public async Task<Comment> UpdateComment(int id, UpdateCommentDto updateCommentDto)
        {
            var comment = await _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                throw new Exception("Comment không tìm thấy");
            }


            if (!await IsValidDestinyId(updateCommentDto.DestinyId))
            {
                throw new Exception("DestinyId không tìm thấy");
            }

            comment.DestinyId = updateCommentDto.DestinyId;
            comment.CommentData = updateCommentDto.CommentData;
            comment.UpdateDate = DateTime.Now;
            comment.Status = 2;

            await _commentRepository.UpdateComment(comment);
            await _unitOfWork.SaveAsync();
            return comment;
        }




        #region
        private async Task<bool> IsValidUserId(int userId)
        {
            var user = await _appUserRepository.GetUserById(userId);
            return user != null;
        }

        // Kiểm tra DestinyId có tồn tại không
        private async Task<bool> IsValidDestinyId(int destinyId)
        {
            var destiny = await _destinyRepository.GetDestinyById(destinyId);
            return destiny != null;
        }
        #endregion
    }

}
