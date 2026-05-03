import express from 'express';
import projectRoutes from './projectRoutes.js';
import clientRoutes from './clientRoutes.js';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/clients', clientRoutes);

// Contact endpoint (could be moved to a separate controller/service if needed)
router.post('/contact', (req, res) => {
  console.log('Received contact message:', req.body);
  res.status(201).json({ message: 'Message received successfully' });
});

export default router;
