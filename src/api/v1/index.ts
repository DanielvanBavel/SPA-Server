import express = require('express');
import userRoutes from './user.routes';
import postRoutes from './post.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;