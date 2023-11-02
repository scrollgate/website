import { Layout, Typography } from 'antd';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import { Outlet, useMatches } from 'react-router-dom';

import { HeaderComponent } from '@root/components';
import { ThemeMode } from '@root/constants';
import { useThemeStore } from '@root/services/store';

import './default-layout.scss';

export default function EmptyLayout() {
  const matches = useMatches();
  const crumbs = matches.filter((match) => !!match.handle);
  const pageTitle = (crumbs?.at(-1)?.handle as any)?.pageTitle;
  const appTheme = useThemeStore((state) => state.appTheme);
  const isDarkTheme = appTheme === ThemeMode.Dark;

  return (
    <div className={clsx('min-h-screen', { 'bg-dark': isDarkTheme, 'bg-light': !isDarkTheme })}>
      <Helmet>
        <title>ScrollGate - {pageTitle}</title>
      </Helmet>

      <HeaderComponent />

      <div className="mx-[50px] xl:mx-32">
        <Outlet />
      </div>

      <Layout.Footer className="text-center bg-transparent p-0 h-20">
        <Typography className="text-base font-semibold">
          Copyright ©2023. All Rights Reversed by ScrollGate
        </Typography>
      </Layout.Footer>
    </div>
  );
}
