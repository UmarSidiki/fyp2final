'use client';
import { useEffect, useState } from 'react';

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
      const header = document.querySelector('header');
      if (header) {
        document.body.style.paddingTop = `${header.offsetHeight}px`;
      }
    };

    handleScroll(); // initialize on mount
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.body.style.paddingTop = ''; // cleanup
    };
  }, []);

  return isScrolled;
};

export default useScroll;
