/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import styles from './style.module.scss';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect'; // Add this import

export default function Home() {
	const firstText = useRef(null);
	const secondText = useRef(null);
	const slider = useRef(null);
	const [isLightOn, setIsLightOn] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [techLevel, setTechLevel] = useState(1); // Default to medium level
	const [typingFade, setTypingFade] = useState(true);
	const [sliderPosition, setSliderPosition] = useState(50);

	// Map slider position to tech level
	useEffect(() => {
		// Map 0-100 range to tech levels
		if (sliderPosition < 33.33) {
		setTechLevel(0); // Less techy
		} else if (sliderPosition < 66.66) {
		setTechLevel(1); // Medium techy
		} else {
		setTechLevel(2); // More techy
		}
	}, [sliderPosition]);

	const sliderFillStyle = {
		background: 'linear-gradient(90deg, rgba(255, 170, 0, 0.4) ' + sliderPosition + '%, transparent 0%)',
	};

	// Update your tech level change handler
	const handleTechLevelChange = (e) => {
		// Get the value immediately
		const newValue = parseInt(e.target.value);
		
		// Update state right away
		setTechLevel(newValue);
		
		// Handle animations separately
		setTypingFade(false);
		setTimeout(() => setTypingFade(true), 100);
	};
	
	// Combined state for showing glow
	const showGlow = isLightOn || isHovering;
	
	let xPercent = 0;
	let direction = -1;

    const [time, setTime] = useState("");

	// Three levels of about me descriptions
	const aboutTexts = {
		less: "I build websites and apps that work well. I also create smart systems that learn from data. I enjoy making technology simple and useful for everyone.",
		medium: "I am a passionate Full-Stack Developer and Machine Learning Engineer with expertise in building modern web applications and implementing ML solutions. With a strong background in both frontend and backend technologies, I create seamless user experiences while implementing robust server-side logic. My journey in ML & MLOps has equipped me with the skills to develop, deploy, and maintain machine learning models in production environments.",
		more: "I architect scalable web applications using React, Next.js, and Node.js with a focus on performance optimization, state management patterns, and responsive design principles. My backend expertise includes designing RESTful APIs, GraphQL endpoints, and microservices architecture with containerized deployment using Docker and orchestration with Kubernetes. In the ML domain, I specialize in computer vision and NLP using PyTorch and TensorFlow, with experience in designing neural network architectures, hyperparameter optimization, and deploying models with MLflow and Kubeflow for continuous training pipelines."
	};

	// Three levels of skills
	const skillsData = {
		0: ["Web", "Apps", "AI", "Data", "Cloud"],
		1: ["React", "Node.js", "Python", "TensorFlow", "PyTorch", "Docker", "Kubernetes", "CI/CD"],
		2: ["React/Next.js", "Redux/Context API", "Node.js/Express", "Django/Flask", "PyTorch/TensorFlow", "Computer Vision", "NLP/LLMs", "Kubernetes/EKS", "MLOps/Kubeflow", "CI/CD/GitOps"]
	};

	// Get current text based on tech level
	const getCurrentText = () => {
		switch(techLevel) {
			case 0: return aboutTexts.less;
			case 1: return aboutTexts.medium;
			case 2: return aboutTexts.more;
			default: return aboutTexts.medium;
		}
	};

	useEffect(() => {
		const updateTime = () => {
			const indiaTime = new Date().toLocaleTimeString('en-IN', {
				timeZone: 'Asia/Kolkata',
				hour12: true,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			setTime(indiaTime);
		};
		updateTime();
		const intervalId = setInterval(updateTime, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (slider.current && firstText.current && secondText.current) {
			gsap.to(slider.current, {
				scrollTrigger: {
					trigger: document.documentElement,
					scrub: 0.5,
					start: 0,
					end: window.innerHeight,
					onUpdate: (e) => (direction = e.direction * -1),
				},
				x: '-500px',
			});

			requestAnimationFrame(animate);
		}
	}, []);

	const animate = () => {
		if (xPercent < -100) {
			xPercent = 0;
		} else if (xPercent > 0) {
			xPercent = -100;
		}
		gsap.set(firstText.current, { xPercent: xPercent });
		gsap.set(secondText.current, { xPercent: xPercent });
		xPercent += 0.03 * direction;
		requestAnimationFrame(animate);
	};

	return (
		<motion.main
			variants={slideUp}
			initial="initial"
			animate="enter"
			className={styles.landing}
			id="home"
		>
			{/* Combined Section */}
			<div className={styles.combinedSection}>
				<div className={styles.imageContainer}>
					{/* Switch Component */}
					<div className={styles.switchContainer}>
						<button 
							onClick={() => setIsLightOn(!isLightOn)}
							className={`${styles.switch} ${showGlow ? styles.active : ''}`}
						>
							<div className={`${styles.toggle} ${showGlow ? styles.active : ''}`} />
						</button>
						<span className={`${styles.switchText} ${showGlow ? styles.active : ''}`}>
							{showGlow ? 'ON' : 'OFF'}
						</span>
					</div>

					<div 
					className={styles.hoverTarget}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					/>
					<Image
					src="/images/bulb1.png"
					fill={true}
					alt="cutout bulb"
					quality={100}
					priority={true}
					className={styles.normalImage}
					/>
					<Image
					src="/images/bulb7up.png"
					fill={true}
					alt="glowing bulb"
					quality={100}
					className={`${styles.glowImage} ${showGlow ? styles.active : ''}`}
					/>
					<Image
					src="/images/glow.png"
					fill={true}
					alt="glow"
					quality={100}
					className={`${styles.glow} ${showGlow ? styles.active : ''}`}
					/>
				</div>
				
				<div className={styles.sliderContainer}>
					<div ref={slider} className={styles.slider}>
						<div>
							<p ref={firstText}>Abdul Majeed —</p>
							<p ref={secondText}>Abdul Majeed —</p>
						</div>
					</div>
				</div>
				
				<div className={styles.description}>
					<svg
						width="9"
						height="9"
						viewBox="0 0 9 9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<linearGradient
								id="grad1"
								x1="0%"
								x2="100%"
								y1="0%"
								y2="0%"
							>
								<stop offset="0%" stopColor="#ffd700" />
								<stop offset="100%" stopColor="#ffd700" />
							</linearGradient>
						</defs>
						<path
							d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
							fill="url(#grad1)"
						/>
					</svg>
					<p>Full-Stack Developer</p>
					<p>ML & MLOps Engineer</p>
					<p>India: {time}</p>
				</div>
				
				{/* About Content with Typewriter */}
				<div className={styles.aboutContent}>
					{/* <h2>About Me</h2> */}
					
					{/* Techiness Slider */}
					<div className={styles.sliderContainer1}>
						<span className={styles.sliderLabel}>Simplified</span>
						<input 
							type="range" 
							min="0" 
							max="100" 
							step="1"
							value={sliderPosition}  
							onChange={(e) => setSliderPosition(parseInt(e.target.value))}
							className={styles.techinessSlider}
							style={sliderFillStyle}
						/>
						<span className={styles.sliderLabel}>Advanced</span>
					</div>

					{/* Typewriter Effect from package */}
					<div className={styles.aboutText} style={{ opacity: typingFade ? 1 : 0.3 }}>
						<Typewriter
							onInit={(typewriter) => {
								typewriter
									.typeString(getCurrentText())
									.start();
							}}
							options={{
								delay: 20,
								cursor: '|',
								deleteSpeed: 5,
							}}
							key={techLevel} // Force re-render when tech level changes
						/>
					</div>
					
					{/* Skills */}
					<div className={styles.skillsContainer}>
						<h3>Skills</h3>
						<div className={styles.skills}>
							{skillsData[techLevel].map((skill, index) => (
								<span 
									key={`${skill}-${techLevel}`}
									className={styles.skill}
									style={{ 
										animationDelay: `${index * 0.1}s`,
										opacity: typingFade ? 1 : 0,
										transform: typingFade ? 'translateY(0)' : 'translateY(10px)',
										transition: 'opacity 0.4s ease, transform 0.4s ease'
									}}
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</motion.main>
	);
}