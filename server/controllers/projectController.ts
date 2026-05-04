import { Request, Response } from 'express';
import { getAllProjects, getProjectById as getProjectFromService } from '../services/projectService.js';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await getProjectFromService(id as string);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};
