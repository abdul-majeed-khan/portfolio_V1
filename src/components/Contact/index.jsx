import styles from './styles.module.scss';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import Rounded from '../../common/RoundedButton';
import { FaLinkedin, FaDiscord, FaTwitter, FaWhatsapp, FaEnvelope, FaGithub, FaFileAlt } from 'react-icons/fa';

export default function Contact() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });
    
    const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
    
    return (
        <motion.div style={{y}} ref={container} className={styles.contact} id='contact'>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.decorativeElement}>
                            <motion.div 
                                className={styles.circle}
                                animate={{ 
                                    scale: [.3, .3, .3],
                                    opacity: [0.7, 1, 0.7],
                                }}
                            />
                            <motion.div 
                                className={styles.circle}
                                animate={{ 
                                    scale: [1, .5, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div 
                                className={styles.circle}
                                animate={{ 
                                    scale: [1.2, .5, 1.2],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                        <h2>Let's Work</h2>
                        <h2>Together</h2>
                    </span>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Rounded className={styles.rounded} onClick={() => {window.open('mailto:abdulmajeed301100@gmail.com?subject=Project%20Inquiry&body=Hi%20Abdul,%20I%20have%20a%20project%20idea%20to%20discuss.', '_blank');}}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                </div>
                
                <div className={styles.nav}>
                    <a href="mailto:abdulmajeed301100@gmail.com" className={styles.button}>
                        <FaEnvelope className={styles.icon} />
                        <p>abdulmajeed301100@gmail.com</p>
                    </a>
                    <a href="https://wa.me/971588046607" className={styles.button}>
                        <FaWhatsapp className={styles.icon} />
                        <p>+971-58-804-6607</p>
                    </a>
                </div>
                
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>Portfolio</h3>
                            <p>2025 © Edition</p>
                        </span>
                        <span>
                            <h3>Location</h3>
                            <p>Dubai, UAE</p>
                        </span>
                    </div>
                    <div className={styles.socials}>
                        <div className={styles.socialLinks}>
                            <Magnetic>
                                <a href="https://github.com/abdul-majeed-khan" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaGithub size={22} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://www.linkedin.com/in/abdul-majeed-khan/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaLinkedin size={22} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://x.com/Majeed_00_" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaTwitter size={22} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://discord.com/users/abdulmajeed1572" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaDiscord size={22} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://drive.google.com/file/d/1FPKOmgQrzf78610_R3dGP70XdD33BFJG/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaFileAlt size={22} />
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}