const commentModel = require('../models/commentModel');

const commentController = {
  // POST /api/posts/:id/comments
  async create(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const { content } = req.body;

      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: 'Comment content is required' });
      }

      const result = await commentModel.create(postId, req.user.userId, content.trim());

      res.status(201).json({
        message: 'Comment added',
        commentId: result.insertId
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/posts/:id/comments
  async getByPost(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const comments = await commentModel.getByPostId(postId);
      res.json(comments);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/comments/:id
  async delete(req, res, next) {
    try {
      const commentId = parseInt(req.params.id);
      const result = await commentModel.delete(commentId, req.user.userId);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Comment not found or you are not the owner' });
      }

      res.json({ message: 'Comment deleted' });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = commentController;
