import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/textbook/__docusaurus/debug',
    component: ComponentCreator('/textbook/__docusaurus/debug', '609'),
    exact: true
  },
  {
    path: '/textbook/__docusaurus/debug/config',
    component: ComponentCreator('/textbook/__docusaurus/debug/config', '068'),
    exact: true
  },
  {
    path: '/textbook/__docusaurus/debug/content',
    component: ComponentCreator('/textbook/__docusaurus/debug/content', '898'),
    exact: true
  },
  {
    path: '/textbook/__docusaurus/debug/globalData',
    component: ComponentCreator('/textbook/__docusaurus/debug/globalData', '16f'),
    exact: true
  },
  {
    path: '/textbook/__docusaurus/debug/metadata',
    component: ComponentCreator('/textbook/__docusaurus/debug/metadata', 'b8f'),
    exact: true
  },
  {
    path: '/textbook/__docusaurus/debug/registry',
    component: ComponentCreator('/textbook/__docusaurus/debug/registry', '454'),
    exact: true
  },
  {
    path: '/textbook/__docusaurus/debug/routes',
    component: ComponentCreator('/textbook/__docusaurus/debug/routes', 'c9a'),
    exact: true
  },
  {
    path: '/textbook/search',
    component: ComponentCreator('/textbook/search', '73f'),
    exact: true
  },
  {
    path: '/textbook/docs',
    component: ComponentCreator('/textbook/docs', '0e7'),
    routes: [
      {
        path: '/textbook/docs',
        component: ComponentCreator('/textbook/docs', 'f67'),
        routes: [
          {
            path: '/textbook/docs',
            component: ComponentCreator('/textbook/docs', 'f95'),
            routes: [
              {
                path: '/textbook/docs/intro',
                component: ComponentCreator('/textbook/docs/intro', 'e8f'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/docs/module1',
                component: ComponentCreator('/textbook/docs/module1', '741'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/docs/module2',
                component: ComponentCreator('/textbook/docs/module2', 'fdb'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/docs/module3',
                component: ComponentCreator('/textbook/docs/module3', 'e26'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/docs/module4',
                component: ComponentCreator('/textbook/docs/module4', '422'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/docs/overview',
                component: ComponentCreator('/textbook/docs/overview', '1fa'),
                exact: true,
                sidebar: "textbookSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/textbook/',
    component: ComponentCreator('/textbook/', 'd4f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
