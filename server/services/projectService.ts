import Project, { IProject } from '../models/Project.js';

export const getAllProjects = async (): Promise<IProject[]> => {
  return await Project.find().sort({ order: 1 });
};

export const getProjectById = async (id: string): Promise<IProject | null> => {
  return await Project.findById(id);
};
