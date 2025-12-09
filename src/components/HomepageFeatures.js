import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Physical AI Focus',
    icon: '🤖',
    description: (
      <p>
        Unlike traditional software AI, this textbook specializes in AI systems that interact
        with the physical world through robotic bodies, exploring how embodiment affects
        intelligence and learning.
      </p>
    ),
  },
  {
    title: 'Humanoid Robotics',
    icon: '🦾',
    description: (
      <p>
        Focused specifically on humanoid robots, examining the unique challenges and
        opportunities in creating human-like robotic systems.
      </p>
    ),
  },
  {
    title: 'Practical Implementation',
    icon: '💻',
    description: (
      <p>
        Combines theoretical concepts with hands-on implementation using industry-standard
        tools like ROS 2, Gazebo, and NVIDIA Isaac.
      </p>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}