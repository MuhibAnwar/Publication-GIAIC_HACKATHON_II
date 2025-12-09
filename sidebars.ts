import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro', 'overview'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System',
      items: ['module1/index'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin',
      items: ['module2/index'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain',
      items: ['module3/index'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action',
      items: ['module4/index'],
      collapsed: false,
    }
  ],
};

export default sidebars;