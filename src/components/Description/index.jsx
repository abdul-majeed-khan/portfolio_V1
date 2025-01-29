import styles from './styles.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, slideIn } from './animation';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const phrase = `React Developer with 4 years of experience, specializing in modern web applications and AI integration. Deep learning certified with hands-on experience in CUDA neural networks and LLMs. Passionate about creating innovative solutions at the intersection of web development and artificial intelligence.`;
    const description = useRef(null);
    const isInView = useInView(description);

    return (
        <div ref={description} className={styles.description} id='about'>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map((word, index) => (
                        <span key={index} className={styles.mask}>
                            <motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"}>{word}</motion.span>
                        </span>
                    ))
                }
                </p>
                <motion.p variants={slideIn} animate={isInView ? "open" : "closed"}>
                    Other than that, I like video games, anime, Formula 1, NBA and e-Sports. I touch grass by playing basketball and skating.
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Magnetic>
                    <div className={styles.button}>
                        Resume in menu.
                    </div>
                    </Magnetic>
                </div>
            </div>
        </div>
    )
}
