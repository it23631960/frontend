import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition > 50 ? 'py-3' : 'py-5'}`}>
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between px-6 py-3 border rounded-full backdrop-blur-md bg-white/10 border-white/20">
            <div className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              BeautySalon
            </div>
            <nav className="items-center hidden space-x-8 md:flex">
              {['hair', 'barber', 'nail', 'bridal'].map(item => (
                <button 
                  key={item} 
                  onClick={() => scrollTo(item)} 
                  className="transition-colors text-white/90 hover:text-white"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              
              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 font-medium text-white transition-all rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50"
              >
                Sign Up
              </motion.button>
            </nav>
            <button className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }} 
          className="fixed left-0 right-0 z-40 top-20 backdrop-blur-lg bg-black/70 border-y border-white/10"
        >
          <div className="container px-6 py-4 mx-auto">
            <nav className="flex flex-col space-y-4">
              {['hair', 'barber', 'nail', 'bridal'].map(item => (
                <button 
                  key={item} 
                  onClick={() => scrollTo(item)} 
                  className="py-2 text-left transition-colors text-white/90 hover:text-white"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              <button
                onClick={() => navigate('/login')}
                className="py-2 text-left font-medium text-purple-400 hover:text-pink-400 transition-colors"
              >
                Sign Up
              </button>
            </nav>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-purple-500 to-pink-500" 
        style={{ scaleX: scrollYProgress }} 
      />
    </>
  );
};
