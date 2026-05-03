import Client, { IClient } from '../models/Client.js';

export const getAllClients = async (): Promise<IClient[]> => {
  return await Client.find().sort({ order: 1 });
};
