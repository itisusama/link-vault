import React from 'react';
import { ExternalLink, Trash2, Link as LinkIcon } from 'lucide-react';
import { Link } from '../types';

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete }) => {
  const displayId = link._id || link.id;

  return (
    <div className="glass-card group relative rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
            <LinkIcon size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg truncate group-hover:text-indigo-300 transition-colors">
              {link.name}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm mt-0.5">
               <a
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 flex items-center gap-1.5 transition-colors group/link"
              >
                <span className="truncate max-w-[180px] sm:max-w-[300px]">{link.url}</span>
                <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => displayId && onDelete(displayId)}
          className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          aria-label="Delete link"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      {link.description && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
            {link.description}
          </p>
        </div>
      )}
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
