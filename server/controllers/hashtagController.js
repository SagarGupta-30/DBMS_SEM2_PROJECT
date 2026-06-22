const hashtagModel = require('../models/hashtagModel');

const hashtagController = {
  // GET /api/hashtags/trending
  async getTrending(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const trending = await hashtagModel.getTrending(limit);
      res.json(trending);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/hashtags/:tag/posts
  async getPostsByTag(req, res, next) {
    try {
      const tag = req.params.tag;
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;

      const posts = await hashtagModel.getPostsByTag(tag, req.user.userId, limit, offset);

      // Attach hashtags to each post
      for (const post of posts) {
        post.hashtags = await hashtagModel.getByPostId(post.post_id);
      }

      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = hashtagController;
