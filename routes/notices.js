import express from 'express';
import { getPostsCount } from '../controllers/posts.js';
import { getNotice, addNotice} from '../controllers/notifications.js';

const router = express.Router();

router.get('/notifications', getNotice);
router.get('/postCount', getPostsCount);
router.post('/notifications', addNotice);

export default router;