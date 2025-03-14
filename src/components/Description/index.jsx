import styles from './styles.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, slideIn } from './animation';
import Magnetic from '../../common/Magnetic';

export default function AboutMe() {
    const phrase = `React Developer with 4 years of experience, specializing in modern web applications and AI integration. Deep learning certified with hands-on experience in CUDA neural networks and LLMs. Passionate about creating innovative solutions at the intersection of web development and artificial intelligence.`;
    const description = useRef(null);
    const isInView = useInView(description, { once: false, amount: 0.3 });

    const skills = [
        {
            title: "Frontend",
            icon: "< >",
            technologies: "React, Next.js, Redux"
        },
        {
            title: "Backend",
            icon: "≡",
            technologies: "Node.js, Express, Fastify"
        },
        {
            title: "Database",
            icon: "⚿",
            technologies: "MongoDB, Mongoose"
        },
        {
            title: "Performance",
            icon: "⚡",
            technologies: "Optimization, Caching"
        }
    ];

    return (
        <div ref={description} className={styles.description} id='about'>
            <motion.h1 
                className={styles.sectionTitle}
                variants={slideUp} 
                animate={isInView ? "open" : "closed"}
            >
                About Me
            </motion.h1>
            
            <div className={styles.content}>
                <div className={styles.body}>
                    <div className={styles.mainContent}>
                        <div className={styles.textContent}>
                            <p className={styles.introText}>
                            {
                                phrase.split(" ").map((word, index) => (
                                    <span key={index} className={styles.mask}>
                                        <motion.span 
                                            variants={slideUp} 
                                            custom={index} 
                                            animate={isInView ? "open" : "closed"}
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))
                            }
                            </p>
                            <motion.p 
                                className={styles.secondaryText}
                                variants={slideIn} 
                                custom={1}
                                animate={isInView ? "open" : "closed"}
                            >
                                My expertise extends to modern frameworks like Next.js and state management tools like Redux. I'm committed to writing clean, efficient code and staying up-to-date with the latest industry trends to deliver cutting-edge solutions for my clients.
                            </motion.p>
                            <motion.p 
                                className={styles.hobbyText}
                                variants={slideIn} 
                                custom={2} 
                                animate={isInView ? "open" : "closed"}
                            >
                                Other than that, I like video games, anime, Formula 1, NBA and e-Sports. I touch grass by playing basketball and skating.
                            </motion.p>
                        </div>
                        
                        <div className={styles.resumeButton}>
                            <Magnetic>
                                <div className={styles.button}>
                                    Resume in menu
                                </div>
                            </Magnetic>
                        </div>
                    </div>
                    
                    <motion.div 
                        className={styles.skillGrid}
                        variants={slideIn}
                        custom={3}
                        animate={isInView ? "open" : "closed"}
                    >
                        {skills.map((skill, index) => (
                            <motion.div 
                                key={index} 
                                className={styles.skillCard}
                                variants={slideIn}
                                custom={index + 4}
                                animate={isInView ? "open" : "closed"}
                            >
                                <div className={styles.skillIcon}>{skill.icon}</div>
                                <h3>{skill.title}</h3>
                                <p>{skill.technologies}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}