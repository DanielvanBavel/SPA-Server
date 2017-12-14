import express = require('express');
import groupRoutes from './groups.routes';

const router = express.Router();

router.use('/groups', groupRoutes);

export default router;