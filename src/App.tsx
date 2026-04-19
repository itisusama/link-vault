import { useState, useEffect } from 'react';
import { api } from './api';
import { Link } from './types';
import { LinkCard } from './components/LinkCard';
import { LinkForm } from './components/LinkForm';
import { Link2, Loader2, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const data = await api.getLinks();
      setLinks(data);
      setError(null);
    } catch (err) {
      setError('Backend not detected. Using local storage mode.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = async (newLinkData: { name: string; url: string; description?: string }) => {
    try {
      const addedLink = await api.addLink(newLinkData);
      setLinks((prev) => [addedLink, ...prev]);
    } catch (err) {
      console.error('Error adding link:', err);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await api.deleteLink(id);
      setLinks((prev) => prev.filter((l) => (l._id || l.id) !== id));
    } catch (err) {
      console.error('Error deleting link:', err);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-3xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl text-white shadow-2xl shadow-indigo-500/20 float-animation">
              <Link2 size={40} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-black tracking-tight flex items-center gap-2">
                Link<span className="gradient-text">Vault</span>
              </h1>
              <p className="text-slate-400 font-medium">Curate your digital universe</p>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-4 glass-card rounded-2xl flex items-center gap-3 text-indigo-300 border-indigo-500/20"
            >
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Sparkles size={18} />
              </div>
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <LinkForm onAdd={handleAddLink} />
          </motion.div>
          
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">Collected Links</h2>
              <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20">
                {links.length}
              </span>
            </div>
            {links.length > 0 && (
               <div className="h-px flex-grow mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Loader2 className="animate-spin mb-4 text-indigo-500" size={48} />
              <p className="font-medium animate-pulse">Loading your vault...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {links.length > 0 ? (
                  links.map((link, index) => (
                    <motion.div
                      key={link._id || link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <LinkCard
                        link={link}
                        onDelete={handleDeleteLink}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 glass-card rounded-3xl border-dashed border-white/10"
                  >
                    <div className="text-slate-600 flex justify-center mb-6">
                      <div className="p-6 bg-white/5 rounded-full">
                        <Link2 size={64} className="opacity-20" />
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Vault is empty</h3>
                    <p className="text-slate-400 max-w-xs mx-auto text-sm">
                      Start building your collection by adding a new link above.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-12 border-t border-white/5 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              {['MongoDB', 'Express', 'React', 'Node'].map((tech) => (
                <span key={tech} className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-slate-500 text-xs flex items-center gap-2">
              <Info size={14} className="text-indigo-500/50" />
              Full stack architecture ready for production
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
