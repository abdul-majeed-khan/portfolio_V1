import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useInView, useTransform } from 'framer-motion';
import styles from './style.module.scss';

const Card = ({
  id,
  title,
  tags,
  src,
  link,
  color,
}) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  

  
  // 3D tilt effect on hover
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);
  
  // Handle mouse movement for card tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Generate gradient based on the provided color
  const getGradient = () => {
    const lightColor = color + '99'; // Adding transparency
    return `linear-gradient(to bottom right, ${color}, ${lightColor})`;
  };
  
  // Handle mouse enter - play video
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (videoRef.current && videoRef.current.paused && src.endsWith('.webm')) {
      // Start playing on hover
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Play failed:', error);
      });
    }
  };
  
  // Handle mouse leave - pause video
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (videoRef.current && !videoRef.current.paused && src.endsWith('.webm')) {
      // Pause when not hovering
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  // Handle video playback for manual control via click
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log('Play failed:', error);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  // Update playing state when video plays or pauses
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Pause video when scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src.endsWith('.webm')) return;
    
    if (!isInView && isPlaying) {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView, isPlaying, src]);
  
  return (
    <motion.div 
      ref={cardRef}
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      id={`card-${id}`}
    >
      
      <motion.div 
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: getGradient(),
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px ${color}40` 
            : `0 10px 30px rgba(0, 0, 0, 0.1)`
        }}
        transition={{ 
          rotateX: { duration: 0.2, ease: "easeOut" },
          rotateY: { duration: 0.2, ease: "easeOut" },
          boxShadow: { duration: 0.3 }
        }}
      >
        {/* Main Media Container (now covers full card) */}
        <div className={styles.mediaContainer}>
          {src.endsWith('.webm') ? (
            <video
              ref={videoRef}
              src={`/videos/${src}`}
              className={styles.video}
              controls={false}
              autoPlay={false}
              loop
              muted
              playsInline
              onClick={togglePlayPause}
              preload="metadata"
            />
          ) : (
            <div className={styles.imageWrapper}>
              <Image 
                fill 
                src={`/images/${src}`} 
                alt={title} 
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 90vw"
                loading="lazy"
              />
            </div>
          )}
          
          {/* Play button overlay for videos */}
          {src.endsWith('.webm') && (
            <motion.div 
              className={styles.playButtonOverlay}
              onClick={togglePlayPause}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                {isPlaying ? (
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                ) : (
                  <path d="M8 5.14v14l11-7-11-7z" />
                )}
              </svg>
            </motion.div>
          )}
          
          {/* Content overlay at the bottom */}
          <div className={styles.contentOverlay}>
            <div className={styles.leftContent}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.tags}>
                {tags && tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
            
            <div className={styles.rightContent}>
              <a 
                href={link} 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;