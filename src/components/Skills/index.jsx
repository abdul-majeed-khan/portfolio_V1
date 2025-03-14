/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import styles from './styles.module.scss';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { motion } from 'framer-motion';
import { slideUp } from './animation'; // Assuming this contains the slideUp animation for Framer Motion

// Import React icons for skills
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaDocker,
  FaPython,
  FaAws,
  FaJs,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';

import {
  SiTypescript, 
  SiRedux, 
  SiGraphql, 
  SiNextdotjs, 
  SiMongodb, 
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiKeras,
  SiJupyter,
  SiOpencv,
  SiExpress,
  SiGooglecloud
} from 'react-icons/si';

// Custom icons for skills not available in react-icons
const CudaIcon = () => (
  <div style={{ fontSize: '22px', fontWeight: 'bold' }}>CUDA</div>
);
const PlotlyIcon = () => (
  <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Plotly</div>
);

export default function SkillsSection() {
  // Refs for the section and track containers
  const sectionRef = useRef(null);
  const webTrackContainerRef = useRef(null);
  const mlTrackContainerRef = useRef(null);
  
  // Web Development Skills data
  const webDevSkills = [
    { name: "React", icon: <FaReact size={28} />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs size={28} />, color: "#ffffff" },
    { name: "TypeScript", icon: <SiTypescript size={28} />, color: "#3178C6" },
    { name: "JavaScript", icon: <FaJs size={28} />, color: "#F7DF1E" },
    { name: "Redux", icon: <SiRedux size={28} />, color: "#764ABC" },
    { name: "Node.js", icon: <FaNodeJs size={28} />, color: "#339933" },
    { name: "Express", icon: <SiExpress size={28} />, color: "#ffffff" },
    { name: "MongoDB", icon: <SiMongodb size={28} />, color: "#47A248" },
    { name: "GraphQL", icon: <SiGraphql size={28} />, color: "#E10098" },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={28} />, color: "#06B6D4" },
    { name: "HTML5", icon: <FaHtml5 size={28} />, color: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt size={28} />, color: "#1572B6" },
    { name: "Git", icon: <FaGitAlt size={28} />, color: "#F05032" },
    { name: "Docker", icon: <FaDocker size={28} />, color: "#2496ED" }
  ];

  // Machine Learning Skills data
  const mlSkills = [
    { name: "Python", icon: <FaPython size={28} />, color: "#3776AB" },
    { name: "TensorFlow", icon: <SiTensorflow size={28} />, color: "#FF6F00" },
    { name: "PyTorch", icon: <SiPytorch size={28} />, color: "#EE4C2C" },
    { name: "CUDA", icon: <CudaIcon />, color: "#76B900" },
    { name: "NumPy", icon: <SiNumpy size={28} />, color: "#013243" },
    { name: "Pandas", icon: <SiPandas size={28} />, color: "#150458" },
    { name: "Scikit-learn", icon: <SiScikitlearn size={28} />, color: "#F7931E" },
    { name: "Keras", icon: <SiKeras size={28} />, color: "#D00000" },
    { name: "Jupyter", icon: <SiJupyter size={28} />, color: "#F37626" },
    { name: "OpenCV", icon: <SiOpencv size={28} />, color: "#5C3EE8" },
    { name: "Plotly", icon: <PlotlyIcon />, color: "#3F4F75" },
    { name: "AWS", icon: <FaAws size={28} />, color: "#FF9900" },
    { name: "GCP", icon: <SiGooglecloud size={28} />, color: "#4285F4" }
  ];

  // Animation logic using GSAP and ScrollTrigger
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const webTrackContainer = webTrackContainerRef.current;
    const mlTrackContainer = mlTrackContainerRef.current;

    // Exit if containers are not available
    if (!webTrackContainer || !mlTrackContainer) return;

    // Measure the width of one track for each category
    const webTrackWidth = webTrackContainer.querySelector(`.${styles.track}`).offsetWidth;
    const mlTrackWidth = mlTrackContainer.querySelector(`.${styles.track}`).offsetWidth;

    // Initial positions and directions
    let webXPos = 0;
    let mlXPos = 0;
    let webDirection = -1; // Moves left when scrolling down
    let mlDirection = 1;   // Moves right when scrolling down

    // ScrollTrigger to update direction based on scroll
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (e) => {
        webDirection = e.direction * -1; // -1 (left) when scrolling down, 1 (right) when scrolling up
        mlDirection = e.direction * 1;   // 1 (right) when scrolling down, -1 (left) when scrolling up
      },
    });

    // Animation function for Web Development skills
    const animateWeb = () => {
      webXPos += 0.5 * webDirection; // Adjust speed by changing 0.5
      if (webDirection === -1 && webXPos <= -webTrackWidth) {
        webXPos += webTrackWidth; // Reset to 0 (or close to it) when moving left
      } else if (webDirection === 1 && webXPos >= 0) {
        webXPos -= webTrackWidth; // Reset when moving right
      }
      gsap.set(webTrackContainer, { x: webXPos });
      requestAnimationFrame(animateWeb);
    };

    // Animation function for Machine Learning skills
    const animateMl = () => {
      mlXPos += 0.5 * mlDirection; // Adjust speed by changing 0.5
      if (mlDirection === -1 && mlXPos <= -mlTrackWidth) {
        mlXPos += mlTrackWidth; // Reset to 0 (or close to it) when moving left
      } else if (mlDirection === 1 && mlXPos >= 0) {
        mlXPos -= mlTrackWidth; // Reset when moving right
      }
      gsap.set(mlTrackContainer, { x: mlXPos });
      requestAnimationFrame(animateMl);
    };

    // Start animations after a delay to avoid conflicts with Framer Motion
    const timeoutId = setTimeout(() => {
      animateWeb();
      animateMl();
    }, 600);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      trigger.kill();
    };
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      className={styles.skillsSection}
      id="skills"
      variants={slideUp}
      initial="initial"
      animate="enter"
    >
      <h1 className={styles.sectionTitle}>
        Skills & Expertise
      </h1>
      
      {/* Web Development Section */}
      <div className={styles.skillsCategory}>
        <h2 className={styles.categoryTitle}>
          Web Development
        </h2>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            <div ref={webTrackContainerRef} className={styles.trackContainer}>
              {/* First track */}
              <div className={styles.track}>
                {webDevSkills.map((skill, index) => (
                  <div key={`web1-${index}`} className={styles.skillItem}>
                    <div className={styles.skillIcon} style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
              {/* Duplicate track for infinite scrolling */}
              <div className={styles.track}>
                {webDevSkills.map((skill, index) => (
                  <div key={`web2-${index}`} className={styles.skillItem}>
                    <div className={styles.skillIcon} style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Machine Learning & AI Section */}
      <div className={styles.skillsCategory}>
        <h2 className={styles.categoryTitle}>
          Machine Learning & AI
        </h2>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            <div ref={mlTrackContainerRef} className={styles.trackContainer}>
              {/* First track */}
              <div className={styles.track}>
                {mlSkills.map((skill, index) => (
                  <div key={`ml1-${index}`} className={styles.skillItem}>
                    <div className={styles.skillIcon} style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
              {/* Duplicate track for infinite scrolling */}
              <div className={styles.track}>
                {mlSkills.map((skill, index) => (
                  <div key={`ml2-${index}`} className={styles.skillItem}>
                    <div className={styles.skillIcon} style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}