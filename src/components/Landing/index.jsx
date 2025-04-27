/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import styles from './style.module.scss';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Rounded from '../../common/RoundedButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';

export default function Home() {
	const firstText = useRef(null);
	const secondText = useRef(null);
	const slider = useRef(null);
	const [isLightOn, setIsLightOn] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [activeTab, setActiveTab] = useState('About');
	const [time, setTime] = useState("");
	
	// Combined state for showing glow
	const showGlow = isLightOn || isHovering;
	
	let xPercent = 0;
	let direction = -1;

	useEffect(() => {
		const updateTime = () => {
		  const dubaiTime = new Date().toLocaleTimeString('en-US', {
			timeZone: 'Asia/Dubai',
			hour12: true,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		  });
		  setTime(dubaiTime);
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

	// Content for each tab
	const tabContent = {
		About: (
			<div className={styles.tabContent}>
				<div className={styles.terminalLine}>
				<span className={styles.yellow}>$ whoami</span>
				<br />
				<span className={styles.white}>
					I’m a <span className={styles.bold}> full-stack developer </span> and aspiring <span className={styles.bold}> Machine Learning engineer </span> currently pursuing an advanced LLM course at UC Berkeley. 
					With a strong foundation in software engineering and AI, I bring a balance of practical development experience and deep interest in intelligent systems.
				</span>
				</div>
				<div className={styles.terminalLine}>
				<span className={styles.yellow}>$ tech</span>
				<br />
				<span className={styles.white}>
					I specialize in <span className={styles.bold}> web development </span> using JavaScript, TypeScript, and frameworks like Next.js, React.js, and Node.js. 
					I'm skilled in working with <span className={styles.bold}> databases </span> such as MongoDB and PostgreSQL. 
					On the <span className={styles.bold}> ML </span> side, I use Python with tools like Scikit-learn, PyTorch, and LangChain for building and experimenting with intelligent systems.
				</span>
				</div>
				<div className={styles.terminalLine}>
				<span className={styles.yellow}>$ design</span>
				<br />
				<span className={styles.white}>
					With over <span className={styles.bold}> five years </span> of experience in design, I craft visually compelling interfaces and Figma prototypes. 
					I’m proficient with tools like Inkscape, Adobe Illustrator, and Photoshop, and I approach UI/UX with a developer’s mindset for seamless integration.
				</span>
				</div>
				<div className={styles.terminalLine}>
				<span className={styles.yellow}>$ ethics</span>
				<br />
				<span className={styles.white}>
					I thrive in collaborative, team-driven environments while maintaining strong autonomy. 
					I transition fluidly from ideation to development and design, ensuring <span className={styles.bold}> clarity and execution. </span> 
					I may be soft-spoken, but I communicate with precision and intention.
				</span>
				</div>

			</div>
		),
		Skills: (
			<div className={styles.tabContent}>
				<div className={styles.terminalLine}>
					<span className={styles.green}>Frontend:</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>React.js / Next.js</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '92%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>HTML / CSS / SCSS</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '90%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>Backend:</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>Node.js / Express</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '85%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>Python / Django</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '82%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>ML & Data:</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>PyTorch / TensorFlow</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '88%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>MLOps / Kubeflow</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '80%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>DevOps:</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>Docker / Kubernetes</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '84%' }}></div>
					</div>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>CI/CD / GitHub Actions</span>
					<div className={styles.terminalBar}>
						<div className={styles.barFill} style={{ width: '86%' }}></div>
					</div>
				</div>
			</div>
		),
		Experience: (
			<div className={styles.tabContent}>
				<div className={styles.terminalLine}>
					<span className={styles.cyan}>$ cat experience.json</span>
				</div>
				<div className={styles.terminalLine + ' ' + styles.spacer}></div>
				<div className={styles.terminalLine}>
					<span className={styles.yellow}>{'[{'}</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "position":</span> <span className={styles.white}>"Full-Stack Developer",</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "company":</span> <span className={styles.white}>"Platinum Square Real Estate",</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "period":</span> <span className={styles.white}>"2022 - Present",</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "achievements":</span> <span className={styles.white}>"Led development of web applications using React.js and Next.js. Implemented responsive designs and improved performance metrics by 40%."</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.yellow}>{'}, {'}</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "position":</span> <span className={styles.white}>"Lead Web Designer",</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "company":</span> <span className={styles.white}>"Flawed Arts LLC",</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "period":</span> <span className={styles.white}>"2020 - 2022",</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.green}>  "achievements":</span> <span className={styles.white}>"Developed different websites of the company's clients using Node.js , HTML , CSS , Bootstrap & PHP and eventually brought down the cost & increased the site speed by 30% deploying SEO."</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.yellow}>{'}]'}</span>
				</div>
			</div>
		),
		Certifications: (
			<div className={styles.tabContent}>
				<div className={styles.terminalLine}>
					<span className={styles.cyan}>$ ls -la certificates/</span>
				</div>
				<div className={styles.terminalLine + ' ' + styles.spacer}></div>
				
				<div className={styles.terminalLine}>
					<span className={styles.green}>-rw-r--r--</span> <span className={styles.white}>1 abdul staff</span> <span className={styles.yellow}>Mar 2025</span> <span className={styles.white}>UCBSCS.crt</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>UC Berkeley Advanced LLM Engineering</span>
					<div className={styles.certificateDetails}>
						<span className={styles.white}>• Specialized in large language model architectures and fine-tuning techniques</span>
					</div>
					<div className={styles.certificateDetails}>
						<span className={styles.white}>• Developed advanced prompt engineering skills for various application scenarios</span>
					</div>
				</div>
				
				<div className={styles.terminalLine + ' ' + styles.spacer}></div>
				
				<div className={styles.terminalLine}>
					<span className={styles.green}>-rw-r--r--</span> <span className={styles.white}>1 abdul staff</span> <span className={styles.yellow}>Dec 2024</span> <span className={styles.white}>GCP-ML.crt</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>Google Cloud Professional ML Engineer</span>
					<div className={styles.certificateDetails}>
						<span className={styles.white}>• Demonstrated expertise in designing, building and productionizing ML models on Google Cloud</span>
					</div>
					<div className={styles.certificateDetails}>
						<span className={styles.white}>• Proficiency in ML systems design and implementation at enterprise scale</span>
					</div>
				</div>
				
				<div className={styles.terminalLine + ' ' + styles.spacer}></div>
				
				<div className={styles.terminalLine}>
					<span className={styles.green}>-rw-r--r--</span> <span className={styles.white}>1 abdul staff</span> <span className={styles.yellow}>Jul 2023</span> <span className={styles.white}>AWS-DevOps.crt</span>
				</div>
				<div className={styles.terminalLine}>
					<span className={styles.white}>AWS Certified DevOps Engineer Professional</span>
					<div className={styles.certificateDetails}>
						<span className={styles.white}>• Expertise in CI/CD implementation and deployment automation</span>
					</div>
					<div className={styles.certificateDetails}>
						<span className={styles.white}>• Proficient in AWS infrastructure management and monitoring</span>
					</div>
				</div>
			</div>
		)
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

					<motion.div className={styles.buttonContainer}>
						<p>Got an Idea?</p>
                        <Rounded className={styles.rounded}>
                            <p>Let's Chat</p>
                        </Rounded>
                    </motion.div>

					<div 
					className={styles.hoverTarget}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					/>
					<Image
					src="/images/bulb1.png"
					fill={true}
					alt="cutout bulb"
					unoptimized={true}
 					sizes="100vw"
					className={styles.normalImage}
					/>
					<Image
					src="/images/bulb7up.png"
					fill={true}
					alt="glowing bulb"
					unoptimized={true}
					className={`${styles.glowImage} ${showGlow ? styles.active : ''}`}
					/>
					<Image
					src="/images/glow.png"
					fill={true}
					alt="glow"
					unoptimized={true}
					className={`${styles.glow} ${showGlow ? styles.active : ''}`}
					/>
				</div>
				
				<div className={styles.sliderContainer}>
					<div ref={slider} className={styles.slider}>
						<div>
							<p ref={firstText}>Abdul Majeed — Abdul Majeed — Abdul Majeed — Abdul Majeed</p>
							<p ref={secondText}></p>
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
								<stop offset="0%" stopColor="#ffffff" />
								<stop offset="100%" stopColor="#ffffff" />
							</linearGradient>
						</defs>
						<path
							d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
							fill="url(#grad1)"
						/>
					</svg>
					<p>Full-Stack Developer</p>
					<p>ML & MLOps Engineer</p>
					<p>Dubai: {time}</p>
				</div>
				
				{/* Mac Terminal UI replacing the about content */}
				<div className={styles.macTerminalContainer} id='about'>
					<div className={styles.macTerminal}>
						{/* Terminal Chrome */}
						<div className={styles.terminalChrome}>
							<div className={styles.windowControls}>
								<div className={styles.control + ' ' + styles.close}></div>
								<div className={styles.control + ' ' + styles.minimize}></div>
								<div className={styles.control + ' ' + styles.maximize}></div>
							</div>
							<div className={styles.terminalTitle}>
								<span>abdul@Mac ~ -zsh - {activeTab.toLowerCase()}</span>
							</div>
						</div>
						
						{/* Terminal Content with Background */}
						<div className={styles.terminalContent}>
							<div className={styles.terminalBackground}></div>
							<div className={styles.terminalOverlay}></div>
							
							{/* Terminal Menu */}
							<div className={styles.terminalMenu}>
								{Object.keys(tabContent).map(tab => (
									<div 
										key={tab}
										className={`${styles.menuItem} ${activeTab === tab ? styles.active : ''}`}
										onClick={() => setActiveTab(tab)}
									>
										{tab}
									</div>
								))}
							</div>
							
							{/* Terminal Output */}
							<div className={styles.terminalOutput}>
								<div className={styles.terminalInfo}>
									{tabContent[activeTab]}
								</div>
							</div>
							
							{/* Command Prompt */}
							<div className={styles.commandPrompt}>
								<span className={styles.path}>~/portfolio</span>
								<span className={styles.prompt}>$ </span>
								<span className={styles.cursor}>|</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.main>
	);
}