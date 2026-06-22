const groupModel = require('../models/groupModel');

const groupController = {
  // POST /api/groups
  async create(req, res, next) {
    try {
      const { groupName, description } = req.body;
      if (!groupName || groupName.trim().length === 0) {
        return res.status(400).json({ error: 'Group name is required' });
      }

      const result = await groupModel.create(groupName.trim(), description || null, req.user.userId);
      const groupId = result.insertId;

      // Auto-join creator to the group
      await groupModel.join(req.user.userId, groupId);

      const group = await groupModel.findById(groupId);
      res.status(201).json({ message: 'Group created', group });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/groups
  async getAll(req, res, next) {
    try {
      const groups = await groupModel.getAll();

      // Add membership status for current user
      for (const group of groups) {
        group.is_member = await groupModel.isMember(req.user.userId, group.group_id);
      }

      res.json(groups);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/groups/:id
  async getById(req, res, next) {
    try {
      const groupId = parseInt(req.params.id);
      const group = await groupModel.findById(groupId);
      if (!group) return res.status(404).json({ error: 'Group not found' });

      group.is_member = await groupModel.isMember(req.user.userId, groupId);
      res.json(group);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/groups/:id
  async update(req, res, next) {
    try {
      const groupId = parseInt(req.params.id);
      const { groupName, description } = req.body;

      const result = await groupModel.update(groupId, req.user.userId, { groupName, description });
      if (!result || result.affectedRows === 0) {
        return res.status(403).json({ error: 'Group not found or you are not the creator' });
      }

      const group = await groupModel.findById(groupId);
      res.json({ message: 'Group updated', group });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/groups/:id
  async delete(req, res, next) {
    try {
      const groupId = parseInt(req.params.id);
      const result = await groupModel.delete(groupId, req.user.userId);

      if (result.affectedRows === 0) {
        return res.status(403).json({ error: 'Group not found or you are not the creator' });
      }

      res.json({ message: 'Group deleted' });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/groups/:id/join
  async join(req, res, next) {
    try {
      const groupId = parseInt(req.params.id);

      const group = await groupModel.findById(groupId);
      if (!group) return res.status(404).json({ error: 'Group not found' });

      await groupModel.join(req.user.userId, groupId);
      res.json({ message: `Joined group "${group.group_name}"` });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/groups/:id/join
  async leave(req, res, next) {
    try {
      const groupId = parseInt(req.params.id);
      await groupModel.leave(req.user.userId, groupId);
      res.json({ message: 'Left group successfully' });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/groups/:id/members
  async getMembers(req, res, next) {
    try {
      const groupId = parseInt(req.params.id);
      const members = await groupModel.getMembers(groupId);
      res.json(members);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = groupController;
