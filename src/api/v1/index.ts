import express = require('express');
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import groupRoutes from './groups.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/groups', groupRoutes);

export default router;