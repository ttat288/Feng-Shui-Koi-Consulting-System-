﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;
using Service.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto createCommentDto)
        {
            try
            {
                var comment = await _commentService.CreateComment(createCommentDto);
                return Ok(new { StatusCode = StatusCodes.Status201Created, Message = "Comment created successfully", Data = comment });
            }
            catch (Exception ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status404NotFound, Message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] UpdateCommentDto updateCommentDto)
        {
            try
            {
                var comment = await _commentService.UpdateComment(id, updateCommentDto);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Comment updated successfully", Data = comment });
            }
            catch (Exception ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, Message = ex.Message });
            }
        }

        [HttpGet("blog/{blogId}")]
        public async Task<IActionResult> GetCommentsByBlogId(int blogId)
        {
            try
            {
                var comments = await _commentService.GetCommentsByBlogId(blogId);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Comments retrieved successfully", Data = comments });
            }
            catch (Exception ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, ex.Message });
            }
        }
        [HttpGet("blog/{blogId}/count")]
        public async Task<IActionResult> CountCommentsByBlogId(int blogId)
        {
            try
            {
                var count = await _commentService.CountCommentsByBlogId(blogId);
                return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Comment count retrieved successfully", Data = count });
            }
            catch (Exception ex)
            {
                return BadRequest(new { StatusCode = StatusCodes.Status400BadRequest, ex.Message });
            }
        }
    }
}
