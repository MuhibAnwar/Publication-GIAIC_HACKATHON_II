import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/textbook/fr/search',
    component: ComponentCreator('/textbook/fr/search', '5c6'),
    exact: true
  },
  {
    path: '/textbook/fr/docs',
    component: ComponentCreator('/textbook/fr/docs', '02f'),
    routes: [
      {
        path: '/textbook/fr/docs',
        component: ComponentCreator('/textbook/fr/docs', 'fd0'),
        routes: [
          {
            path: '/textbook/fr/docs',
            component: ComponentCreator('/textbook/fr/docs', 'a5e'),
            routes: [
              {
                path: '/textbook/fr/docs/intro',
                component: ComponentCreator('/textbook/fr/docs/intro', '8fc'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/fr/docs/module1',
                component: ComponentCreator('/textbook/fr/docs/module1', '848'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/fr/docs/module2',
                component: ComponentCreator('/textbook/fr/docs/module2', 'af4'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/fr/docs/module3',
                component: ComponentCreator('/textbook/fr/docs/module3', '541'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/fr/docs/module4',
                component: ComponentCreator('/textbook/fr/docs/module4', '1d7'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/textbook/fr/docs/overview',
                component: ComponentCreator('/textbook/fr/docs/overview', '94c'),
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
    path: '/textbook/fr/',
    component: ComponentCreator('/textbook/fr/', '951'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
