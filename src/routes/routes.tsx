import React, { Fragment } from 'react';

import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { RouteItem } from '@interfaces';
import { DefaultLayout, EmptyLayout } from '@layouts';
import NotFoundPage from '@pages/not-found';
import { RouteKeys } from '@root/constants';
import { DefaultGuard } from '@root/guards';
import DeployPage from '@root/pages/deploy';

import { PATH } from './path';

export const routes: RouteItem[] = [
  {
    path: '*',
    component: NotFoundPage,
  },
  {
    path: PATH.root,
    layout: DefaultLayout,
    guard: DefaultGuard,
    routes: [
      {
        path: PATH.deploy,
        component: DeployPage,
        handle: {
          pageTitle: 'Deploy Smart Contract',
          key: RouteKeys.DEPLOY,
        },
      },
    ],
  },
];

export const renderChildren = (children: RouteItem[]): RouteObject[] => {
  return children.reduce((prev: RouteObject[], current) => {
    const RouteComponent = current.component || Fragment;
    const GuardComponent = current.guard || Fragment;
    const LayoutComponent = current.layout || Fragment;
    const LayoutOutlet = current.layout || EmptyLayout;

    if (current.component) {
      prev.push({
        path: current.path,
        handle: current.handle,
        element: (
          <GuardComponent>
            <LayoutComponent>
              <RouteComponent />
            </LayoutComponent>
          </GuardComponent>
        ),
      });
    }

    if (current.routes?.length) {
      prev.push({
        path: current.path,
        handle: current.handle,
        element: (
          <GuardComponent>
            <LayoutOutlet />
          </GuardComponent>
        ),
        children: renderChildren(current.routes),
      });
    }

    return prev;
  }, []);
};

export const renderRoutes = (routesData: RouteItem[] = []) =>
  createBrowserRouter(renderChildren(routesData));
