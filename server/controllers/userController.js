const userModel = require('../models/userModel');
const followModel = require('../models/followModel');

const userController = {
  // GET /api/users/me
  async getMe(req, res, next) {
    try {
      const user = await userModel.getProfile(req.user.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const phones = await userModel.getPhones(req.user.userId);
      res.json({ ...user, phones });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/users/:id
  async getById(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const user = await userModel.getProfile(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Check if current user follows this user
      const isFollowing = await followModel.isFollowing(req.user.userId, userId);
      res.json({ ...user, is_following: isFollowing });
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/users/me
  async updateProfile(req, res, next) {
    try {
      const { bio, dateOfBirth } = req.body;
      await userModel.updateProfile(req.user.userId, { bio, dateOfBirth });

      const updated = await userModel.getProfile(req.user.userId);
      res.json({ message: 'Profile updated', user: updated });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/users/search?q=
  async search(req, res, next) {
    try {
      const query = req.query.q;
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const users = await userModel.search(query.trim());
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/users/me/phone
  async addPhone(req, res, next) {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

      await userModel.addPhone(req.user.userId, phoneNumber);
      res.status(201).json({ message: 'Phone number added' });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/users/me/phone/:phone
  async removePhone(req, res, next) {
    try {
      const phoneNumber = req.params.phone;
      const result = await userModel.removePhone(req.user.userId, phoneNumber);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Phone number not found' });
      }
      res.json({ message: 'Phone number removed' });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/users/:id/follow
  async follow(req, res, next) {
    try {
      const followingId = parseInt(req.params.id);
      if (followingId === req.user.userId) {
        return res.status(400).json({ error: 'You cannot follow yourself' });
      }

      // Check if target user exists
      const targetUser = await userModel.findById(followingId);
      if (!targetUser) return res.status(404).json({ error: 'User not found' });

      await followModel.follow(req.user.userId, followingId);
      res.json({ message: `You are now following ${targetUser.username}` });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/users/:id/follow
  async unfollow(req, res, next) {
    try {
      const followingId = parseInt(req.params.id);
      await followModel.unfollow(req.user.userId, followingId);
      res.json({ message: 'Unfollowed successfully' });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/users/:id/followers
  async getFollowers(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const followers = await followModel.getFollowers(userId);
      res.json(followers);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/users/:id/following
  async getFollowing(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const following = await followModel.getFollowing(userId);
      res.json(following);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = userController;
