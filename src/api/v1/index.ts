import express = require('express');
import userRoutes from './user.routes';
import postRoutes from './post.routes';
//import shoppinglistRoutes from './shoppinglist.routes';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/posts', postRoutes);

//router.use('/shoppinglist', shoppinglistRoutes);

export default router;