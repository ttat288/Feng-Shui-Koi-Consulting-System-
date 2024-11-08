using Repository.Entities;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment> GetCommentById(int id);
        Task InsertComment(Comment comment);
        Task UpdateComment(Comment comment);
        Task DeleteComment(int id);
    }
}
