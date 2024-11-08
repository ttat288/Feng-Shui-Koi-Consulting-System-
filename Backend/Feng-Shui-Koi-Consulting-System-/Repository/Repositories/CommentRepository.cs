using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(FengShuiKoiConsultingSystemContext context) : base(context)
        {
        }

        public async Task<Comment> GetCommentById(int id)
        {
            return await dbSet.FirstOrDefaultAsync(c => c.CommentId == id);
        }

        public async Task InsertComment(Comment comment)
        {
            await dbSet.AddAsync(comment);
        }

        public async Task UpdateComment(Comment comment)
        {
            dbSet.Update(comment);
        }

        public async Task DeleteComment(int id)
        {
            var comment = await GetCommentById(id);
            if (comment != null)
            {
                dbSet.Remove(comment);
            }
        }
    }


}
