import axios from 'axios';
import { Link } from './types';

const API_URL = 'https://link-vault-xs1r.vercel.app/api/links';



// Mock Storage Helper
const getLocalLinks = (): Link[] => {
  const links = localStorage.getItem('links');
  return links ? JSON.parse(links) : [];
};

const saveLocalLinks = (links: Link[]) => {
  localStorage.setItem('links', JSON.stringify(links));
};

export const api = {
  getLinks: async (): Promise<Link[]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using localStorage');
      return getLocalLinks();
    }
  },

  addLink: async (link: Omit<Link, '_id' | 'id' | 'createdAt'>): Promise<Link> => {
    try {
      const response = await axios.post(API_URL, link);
      // Clean up local storage if backend comes online
      return response.data;
    } catch (error) {
      const newLink: Link = {
        ...link,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const links = getLocalLinks();
      const updatedLinks = [newLink, ...links];
      saveLocalLinks(updatedLinks);
      return newLink;
    }
  },

  deleteLink: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Also update local storage in case we were using both or if the backend failed after successful response
      const links = getLocalLinks();
      saveLocalLinks(links.filter(l => l._id !== id && l.id !== id));
    } catch (error) {
      const links = getLocalLinks();
      saveLocalLinks(links.filter(l => l.id !== id && l._id !== id));
    }
  }
};
