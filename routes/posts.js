import express from 'express';

//controllers import
import {createPost, getPostsBySearch, getPostsByBatch, getMyPosts, getPost, getRelatedPosts} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/relatedPosts', getRelatedPosts)
router.get('/batch', getPostsByBatch);
router.get('/creatorId', getMyPosts);
router.get('/:id', getPost);
// router.get('/getCount', getPostsCount);
router.post('/', auth, createPost);

export default router;