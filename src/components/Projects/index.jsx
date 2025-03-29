import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import styles from './style.module.scss';

const Card = ({
  id,
  title,
  tags,
  src,
  link,
  isMobile,
}) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: false, 
    amount: isMobile ? 0.3 : 0.5 // More sensitive on mobile
  });
  const [isPlaying, setIsPlaying] = useState(false);
  
  
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
    
    if (isInView) {
      // Try to play the video when in view
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Autoplay failed:', error);
        
        // For mobile, we need user interaction
        if (isMobile) {
          // Add a one-time touch event listener to play the video
          const playVideoOnTouch = () => {
            video.play().then(() => {
              setIsPlaying(true);
              // Remove the event listener after successful play
              document.removeEventListener('touchstart', playVideoOnTouch);
            }).catch(err => console.log('Play on touch failed:', err));
          };
          
          document.addEventListener('touchstart', playVideoOnTouch, { once: true });
        }
      });
    } else if (!isInView && isPlaying) {
      // Pause when out of view
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView, isPlaying, src, isMobile]);

  const videoAttributes = {
    ref: videoRef,
    src: `/videos/${src}`,
    className: styles.video,
    controls: false,
    autoPlay: false, // Set to false, we'll control this with JS
    loop: true,
    muted: true, // Must be muted for autoplay on mobile
    playsInline: true, // Required for iOS
    onClick: togglePlayPause,
    preload: "metadata"
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className={styles.cardWrapper}
      id={`card-${id}`}
    >
      
      <motion.div 
        className={styles.card}
      >
        {/* Main Media Container (now covers full card) */}
        <div className={styles.mediaContainer}>
          {src.endsWith('.webm') ? (
            <video 
              {...videoAttributes}
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