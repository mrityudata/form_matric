import { Request, Response } from 'express';
import { getAllClients } from '../services/clientService.js';

export const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients' });
  }
};
