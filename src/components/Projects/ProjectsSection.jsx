'use client';
import { useEffect, useState, useRef } from 'react';
import { useScroll } from 'framer-motion';
import styles from './ProjectsSection.module.scss';
import Card from './index'; // Import your Card component 
import { projects } from '../../app/data'; // Adjust the path as needed

const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  
  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get scroll progress for animation if needed
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section className={styles.projectsSection} ref={containerRef} id='projects'>
      <div className={styles.projectTitle}>
        <h2>PROJECTS</h2>
      </div>
      
      <div className={styles.projectsContainer}>
        {
          projects.map( (project, i) => {
            const targetScale = 1 - ( (projects.length - i) * 0.05);
            return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
          })
        }
      </div>
    </section>
  );
};

export default ProjectsSection;