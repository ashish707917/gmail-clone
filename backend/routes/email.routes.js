import express from 'express';
import {
  createEmail,
  deleteEmail,
  getALLEmailById,
  getEmailById, // ⬅️ add this controller
} from '../controllers/email.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   POST /api/v1/email
// @desc    Create a new email
// @access  Private
router.post('/', isAuthenticated, createEmail);

// @route   DELETE /api/v1/email/:id
// @desc    Delete an email by ID
// @access  Private
router.delete('/:id', isAuthenticated, deleteEmail);

// @route   GET /api/v1/email/getallemails
// @desc    Get all emails for the logged-in user
// @access  Private
router.get('/getallemails', isAuthenticated, getALLEmailById);

// ✅ ADD THIS ROUTE
// @route   GET /api/v1/email/:id
// @desc    Get a single email by ID
// @access  Private
router.get('/:id', isAuthenticated, getEmailById);

export default router;



