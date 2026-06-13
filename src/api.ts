import { Link } from './types';

const API_URL = 'https://vault-links-eight.vercel.app/api/web_links';

export const api = {
  getLinks: async (): Promise<Link[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  addLink: async (link: Omit<Link, '_id' | 'id' | 'createdAt'>): Promise<Link> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(link),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data ?? json;
  },

  deleteLink: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  },
};
