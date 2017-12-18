import express = require('express');
import groupRoutes from './groups.routes';
import neo4jRoutes from './neo4j.routes'

const router = express.Router();

//router.use('/groups', groupRoutes);
router.use('/groups', neo4jRoutes);

export default router;