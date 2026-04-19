import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface LinkFormProps {
  onAdd: (link: { name: string; url: string; description?: string }) => void;
}

export const LinkForm: React.FC<LinkFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    
    onAdd({ name, url, description });
    setName('');
    setUrl('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 mb-12 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
            Link Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="glass-input w-full px-5 py-3 rounded-xl focus:bg-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="e.g. Design Inspiration"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="url" className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
            Destination URL
          </label>
          <input
            id="url"
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="glass-input w-full px-5 py-3 rounded-xl focus:bg-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
            placeholder="e.g. dribbble.com"
          />
        </div>
      </div>
      <div className="mb-8 space-y-2">
        <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
          Description <span className="text-slate-600">(Optional)</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="glass-input w-full px-5 py-3 rounded-xl focus:bg-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
          rows={2}
          placeholder="Briefly describe what this link is for..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40"
      >
        <PlusCircle size={22} />
        Secure Link to Vault
      </button>
    </form>
  );
};
