using Repository.Entities;
using Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService
{
    public interface ICommentService
    {
        Task<Comment> CreateComment(CreateCommentDto createCommentDto);
        Task<Comment> UpdateComment(int id, UpdateCommentDto updateCommentDto);
        Task<List<CommentDetails>> GetCommentsByBlogId(int blogId);
        Task<int> CountCommentsByBlogId(int blogId);
    }
}
