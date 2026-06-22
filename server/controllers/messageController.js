const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

const messageController = {
  // POST /api/messages
  async send(req, res, next) {
    try {
      const { receiverId, content } = req.body;

      if (!receiverId) return res.status(400).json({ error: 'Receiver is required' });
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: 'Message content is required' });
      }
      if (parseInt(receiverId) === req.user.userId) {
        return res.status(400).json({ error: 'You cannot message yourself' });
      }

      // Check receiver exists
      const receiver = await userModel.findById(parseInt(receiverId));
      if (!receiver) return res.status(404).json({ error: 'Receiver not found' });

      const result = await messageModel.create(req.user.userId, parseInt(receiverId), content.trim());

      res.status(201).json({
        message: 'Message sent',
        messageId: result.insertId
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/messages/conversations
  async getConversations(req, res, next) {
    try {
      const conversations = await messageModel.getConversations(req.user.userId);
      res.json(conversations);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/messages/:userId
  async getThread(req, res, next) {
    try {
      const otherUserId = parseInt(req.params.userId);
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;

      const messages = await messageModel.getThread(req.user.userId, otherUserId, limit, offset);

      // Mark messages from the other user as read
      await messageModel.markAllAsRead(otherUserId, req.user.userId);

      res.json(messages);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/messages/:id/read
  async markAsRead(req, res, next) {
    try {
      const messageId = parseInt(req.params.id);
      await messageModel.markAsRead(messageId, req.user.userId);
      res.json({ message: 'Message marked as read' });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = messageController;
