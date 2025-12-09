// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Bridging the gap between the digital brain and the physical body',
  url: 'https://publication-giac-hackathon-ii.vercel.app', // Vercel deployment URL
  baseUrl: '/', // Root path for Vercel deployment
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config (ignored when deployed to Vercel)
  organizationName: 'MuhibAnwar', // Usually your GitHub org/user name.
  projectName: 'Publication-GIAIC_HACKATHON_II', // Usually your repo name.
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'], // Add more locales as needed
    localeConfigs: {
      en: {
        label: 'English',
      },
      es: {
        label: 'Español',
      },
      fr: {
        label: 'Français',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/spec-ai/textbook/tree/main/',
          remarkPlugins: [
            require('remark-math'),
          ],
          rehypePlugins: [
            [require('rehype-katex'), { strict: false }],
          ],
        },
        blog: false, // Disable blog if not needed
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    // Add the classic preset as a theme as well to make sure components work properly
    '@docusaurus/theme-classic',
    '@docusaurus/theme-mermaid', // For diagrams
  ],

  plugins: [
    
    // Plugin for PWA
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-title',
            content: 'Physical AI & Humanoid Robotics',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/docusaurus.png',
          },
        ],
      },
    ],
    
    
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Physical AI & Humanoid Robotics Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Textbook',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/MuhibAnwar',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Textbook',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Module 1: The Robotic Nervous System',
                to: '/docs/module1',
              },
              {
                label: 'Module 2: The Digital Twin',
                to: '/docs/module2',
              },
              {
                label: 'Module 3: The AI-Robot Brain',
                to: '/docs/module3',
              },
              {
                label: 'Module 4: Vision-Language-Action',
                to: '/docs/module4',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/humanoid-robotics',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/humanoid-robotics',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/robotics',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/MuhibAnwar',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'bash', 'xml'],
      },
      
      // Algolia search configuration
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        
        indexName: 'physical-ai-humanoid-robotics',
        
        // Optional: see doc section below
        contextualSearch: true,
        
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
        
        // Optional: Algolia search parameters
        searchParameters: {},
        
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
  
  // Custom scripts to enhance functionality
  scripts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.min.js',
      async: true,
    }
  ],
  
  // Custom stylesheets
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguPXCnWcmSQRO8ATaeGAZ49A6A',
      crossorigin: 'anonymous',
    }
  ]
};

module.exports = config;