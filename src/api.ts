import axios from 'axios';
import { Link } from './types';

const API_URL = 'https://vault-links-eight.vercel.app/api/web_links';

export const api = {
  getLinks: async (): Promise<Link[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addLink: async (link: Omit<Link, '_id' | 'id' | 'createdAt'>): Promise<Link> => {
    const response = await axios.post(API_URL, link);
    return response.data;
  },

  deleteLink: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
