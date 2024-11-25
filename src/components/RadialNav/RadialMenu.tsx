import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Printer, Cog, Info, Mail, X, Menu, Cpu } from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: Printer, label: 'Instant 3D Print Quote', path: '/instant-quote' },
  { icon: Cog, label: 'Quote CNC Parts', path: '/quote' },
  { icon: Cpu, label: 'Technology', path: '/technology' },
  { icon: Info, label: 'About Us', path: '/about' },
  { icon: Mail, label: 'Contact', path: '/contact' },
];

export function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleItemClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors z-50 relative"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute top-16 right-0">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                    scale: 0.8,
                    transition: { delay: (menuItems.length - index - 1) * 0.1 },
                  }}
                  onClick={() => handleItemClick(item.path)}
                  className="block mb-2 w-64 p-4 bg-gray-900/90 backdrop-blur-sm rounded-lg text-white hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}