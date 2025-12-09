import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
           {/*<div className={styles.heroLogo}>
              <img src={require('@site/static/img/logo.svg').default} alt="Physical AI & Humanoid Robotics" className={styles.logoImage} />
            </div> } */}
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p>Explore the cutting-edge intersection of artificial intelligence and robotics through this comprehensive textbook.</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg color--black bg--white"
                to="/docs/intro">
                Start Reading
              </Link>
              <Link
                className="button button--outline button--secondary button--lg margin-left--md"
                to="/docs/module1">
                Jump to Module 1
              </Link>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.heroVisual}>
              <svg viewBox="0 0 500 400" className={styles.robotIllustration}>
                {/* AI Brain representation with glow */}
                <g transform="translate(250, 60)">
                  <circle r="25" fill="url(#brainGradient)" stroke="#007acc" strokeWidth="2" />
                  <path d="M -15 -15 Q 0 -25 15 -15 M -15 -5 Q 0 5 15 -5 M -15 5 Q 0 15 15 15"
                        stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.8" />
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                    <feFlood floodColor="#007acc" floodOpacity="0.8" result="glowColor" />
                    <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </g>

                {/* Define gradients */}
                <defs>
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2575fc" />
                    <stop offset="100%" stopColor="#007acc" />
                  </linearGradient>
                  <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff8a00" />
                    <stop offset="100%" stopColor="#da1b60" />
                  </linearGradient>
                </defs>

                {/* Robot head */}
                <circle cx="250" cy="120" r="35" fill="url(#bodyGradient)" stroke="#2575fc" strokeWidth="2" className={styles.robotHead} />

                {/* Robot eyes - with status indicator */}
                <circle cx="235" cy="110" r="5" fill="#fff" />
                <circle cx="235" cy="110" r="2.5" fill="#00ff00" />
                <circle cx="265" cy="110" r="5" fill="#fff" />
                <circle cx="265" cy="110" r="2.5" fill="#00ff00" />

                {/* Robot body */}
                <rect x="200" y="150" width="100" height="120" rx="10" fill="url(#bodyGradient)" stroke="#2575fc" strokeWidth="2" className={styles.robotBody} />

                {/* Robot arms - with joints */}
                <line x1="200" y1="170" x2="150" y2="200" stroke="#2575fc" strokeWidth="8" strokeLinecap="round" />
                <line x1="300" y1="170" x2="350" y2="200" stroke="#2575fc" strokeWidth="8" strokeLinecap="round" />

                {/* Joint circles */}
                <circle cx="200" cy="170" r="5" fill="#007acc" />
                <circle cx="300" cy="170" r="5" fill="#007acc" />

                {/* Robot legs - with feet */}
                <line x1="225" y1="270" x2="225" y2="320" stroke="#2575fc" strokeWidth="8" strokeLinecap="round" />
                <line x1="275" y1="270" x2="275" y2="320" stroke="#2575fc" strokeWidth="8" strokeLinecap="round" />

                {/* Feet */}
                <rect x="215" y="320" width="20" height="8" rx="4" fill="#007acc" />
                <rect x="265" y="320" width="20" height="8" rx="4" fill="#007acc" />

                {/* Neural network connections - animated */}
                <path d="M250 85 C250 110, 250 110, 250 150" stroke="#00ff00" strokeWidth="1.5" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite" />
                </path>
                <path d="M220 180 C200 180, 200 220, 220 220" stroke="#ff00ff" strokeWidth="1.5" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
                </path>
                <path d="M280 180 C300 180, 300 220, 280 220" stroke="#ff00ff" strokeWidth="1.5" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Physical AI & Humanoid Robotics Textbook - Bridging the gap between the digital brain and the physical body">
      <HomepageHeader />
      <main>
        <section className={styles.aboutSection}>
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <Heading as="h2" className={clsx('text--center', styles.mainTitle)}>
                  Understanding the Convergence of AI and Robotics
                </Heading>
                <p className={clsx('text--center', styles.description)}>
                  This comprehensive textbook explores the fascinating intersection of artificial intelligence and physical robotics, 
                  where digital intelligence meets the physical world. We examine how humanoid robots are pushing the boundaries 
                  of what's possible in embodied AI systems.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.modulesSection}>
          <div className="container padding-vert--lg">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
                  Course Modules
                </Heading>

                <div className={styles.modulesGrid}>
                  <div className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🤖</div>
                    <h3>Module 1: The Robotic Nervous System</h3>
                    <p>Understanding ROS 2 and the middleware for robot control</p>
                    <Link to="/docs/module1" className={styles.moduleLink}>Explore</Link>
                  </div>

                  <div className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🎮</div>
                    <h3>Module 2: The Digital Twin</h3>
                    <p>Physics simulation and environment building with Gazebo & Unity</p>
                    <Link to="/docs/module2" className={styles.moduleLink}>Explore</Link>
                  </div>

                  <div className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🧠</div>
                    <h3>Module 3: The AI-Robot Brain</h3>
                    <p>Advanced perception and training using NVIDIA Isaac™</p>
                    <Link to="/docs/module3" className={styles.moduleLink}>Explore</Link>
                  </div>

                  <div className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🗣️</div>
                    <h3>Module 4: Vision-Language-Action</h3>
                    <p>The convergence of LLMs and Robotics in humanoid systems</p>
                    <Link to="/docs/module4" className={styles.moduleLink}>Explore</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.quoteSection}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className={styles.quoteBox}>
                  <p className={styles.quoteText}>
                    "The future of artificial intelligence is not just about creating smarter algorithms, 
                    but about creating intelligent systems that can interact, learn, and adapt in the 
                    physical world. Humanoid robotics represents the ultimate testbed for this vision."
                  </p>
                  <p className={styles.quoteAuthor}>— Physical AI Research Collective</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.resourcesSection}>
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
                  Additional Resources
                </Heading>
                <div className="row">
                  <div className="col col--3">
                    <div className={styles.resourceCard}>
                      <h3>Simulations</h3>
                      <p>Interactive simulators to practice concepts from the textbook.</p>
                      <Link to="/docs/module1" className={styles.resourceLink}>
                        Try Now
                      </Link>
                    </div>
                  </div>
                  <div className="col col--3">
                    <div className={styles.resourceCard}>
                      <h3>Exercises</h3>
                      <p>Hands-on problems to reinforce your learning.</p>
                      <Link to="/docs/module2" className={styles.resourceLink}>
                        Practice
                      </Link>
                    </div>
                  </div>
                  <div className="col col--3">
                    <div className={styles.resourceCard}>
                      <h3>Code Examples</h3>
                      <p>Implementation examples from each module.</p>
                      <Link to="/docs/module3" className={styles.resourceLink}>
                        View Code
                      </Link>
                    </div>
                  </div>
                  <div className="col col--3">
                    <div className={styles.resourceCard}>
                      <h3>Research Papers</h3>
                      <p>Key papers referenced throughout the textbook.</p>
                      <Link to="/docs/module4" className={styles.resourceLink}>
                        Read Papers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}