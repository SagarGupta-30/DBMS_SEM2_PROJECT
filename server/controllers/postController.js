const postModel = require('../models/postModel');
const hashtagModel = require('../models/hashtagModel');

const postController = {
  // POST /api/posts
  async create(req, res, next) {
    try {
      const { content, imageUrl } = req.body;
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: 'Post content is required' });
      }

      // Create the post
      const result = await postModel.create(req.user.userId, content.trim(), imageUrl || null);
      const postId = result.insertId;

      // Extract and link hashtags
      const tags = hashtagModel.extractFromText(content);
      for (const tag of tags) {
        const hashtag = await hashtagModel.findOrCreate(tag);
        await hashtagModel.linkToPost(postId, hashtag.hashtag_id);
      }

      // Return the complete post
      const post = await postModel.findById(postId, req.user.userId);
      const hashtags = await hashtagModel.getByPostId(postId);

      res.status(201).json({ ...post, hashtags });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/posts/feed
  async getFeed(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;

      const posts = await postModel.getFeed(req.user.userId, limit, offset);

      // Attach hashtags to each post
      for (const post of posts) {
        post.hashtags = await hashtagModel.getByPostId(post.post_id);
      }

      res.json(posts);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/posts/:id
  async getById(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const post = await postModel.findById(postId, req.user.userId);
      if (!post) return res.status(404).json({ error: 'Post not found' });

      post.hashtags = await hashtagModel.getByPostId(postId);
      res.json(post);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/posts/:id
  async delete(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const result = await postModel.delete(postId, req.user.userId);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Post not found or you are not the owner' });
      }

      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/users/:id/posts
  async getByUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;

      const posts = await postModel.getByUserId(userId, req.user.userId, limit, offset);

      for (const post of posts) {
        post.hashtags = await hashtagModel.getByPostId(post.post_id);
      }

      res.json(posts);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/posts/:id/like
  async like(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      await postModel.like(req.user.userId, postId);
      res.json({ message: 'Post liked' });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/posts/:id/like
  async unlike(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      await postModel.unlike(req.user.userId, postId);
      res.json({ message: 'Post unliked' });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/posts/:id/likes
  async getLikes(req, res, next) {
    try {
      const postId = parseInt(req.params.id);
      const likes = await postModel.getLikes(postId);
      res.json(likes);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = postController;
