import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'
import { createComment } from '../controllers/comment.controllers.js';
import { getPostComments } from '../controllers/comment.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;