'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './style.module.scss';

const AISection = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const projects = [
    {
      title: "LLM Development",
      description: "Fine-tuning and deployment of large language models using PyTorch and Transformers",
      tech: ["PyTorch", "Transformers", "CUDA", "TensorFlow"],
      metrics: "95% accuracy in specific domain tasks",
      link: "https://github.com/neuralblades/LLM-V0"
    },
    {
      title: "Computer Vision",
      description: "Object detection and image segmentation for autonomous systems",
      tech: ["OpenCV", "YOLO", "PyTorch", "CNN"],
      metrics: "Real-time processing at 60 FPS",
      link: "https://github.com/neuralblades/hawkvision2.0"
    },
    {
      title: "MLOps Pipeline",
      description: "End-to-end ML pipeline development with monitoring and deployment",
      tech: ["Kubeflow", "MLflow", "Docker", "Kubernetes"],
      metrics: "50% reduction in deployment time",
      link: "https://github.com/neuralblades/AI-Calling-Agent"
    }
  ];

  return (
    <section ref={containerRef} className={styles.aiSection} id="ai">
      <motion.div 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>ML EXPERTISE</h2>
        <div className={styles.gridLines}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.line} 
                 style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </motion.div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className={styles.projectCard}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={styles.cardContent}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.techStack}>
                {project.tech.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              <div className={styles.metrics}>
                <div className={styles.metricsBar}>
                  <motion.div 
                    className={styles.barFill}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                  />
                </div>
                <span>{project.metrics}</span>
              </div>
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  View Project
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              )}
            </div>
            <div className={styles.cardBackground}>
              <div className={styles.grid}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={styles.gridCell} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.neuralNetwork}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.node}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      <div className={styles.spacer}></div>
    </section>
  );
};

export default AISection;