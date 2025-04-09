'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Lenis from '@studio-freight/lenis'
import ProjectsSection from '../components/Projects/ProjectsSection';
import AISection from '../components/AI'
import Contact from '../components/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set up smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
      lerp: isMobile ? 0.1 : 0.07,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  // Existing preloader code
  useEffect(() => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0,0);
          }, 2000);
          
          return () => {
            if (locomotiveScroll) locomotiveScroll.destroy();
          };
      }
    )()
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      <Landing />

      <ProjectsSection />
      
      <AISection />
      
      <Contact />
    </main>
  );
}