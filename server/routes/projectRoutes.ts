import express from 'express';
import * as projectController from '../controllers/projectController.js';

const router = express.Router();

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

export default router;
