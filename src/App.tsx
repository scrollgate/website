import '@translation/i18n';
import { Suspense, useEffect } from 'react';

import { useUpdateTheme } from '@web3-onboard/react';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';

import { LoadingScreen } from '@components';
import { ThemeMode } from '@constants';
import { renderRoutes, routes } from '@routes/routes';
import { useThemeStore } from '@services/store';
import variables from '@styles/_variables.module.scss';

function App() {
  const appTheme = useThemeStore((state) => state.appTheme);
  const updateTheme = useUpdateTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    const prevTheme = appTheme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    updateTheme(appTheme as any);
    root.classList.remove(prevTheme);
    root.classList.add(appTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: appTheme === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Button: {
            borderRadius: 10,
            borderRadiusLG: 12,
            borderRadiusSM: 10,
            controlHeight: 40,
            controlHeightLG: 50,
          },
          Input: {
            borderRadius: 10,
            borderRadiusLG: 12,
            borderRadiusSM: 10,
            controlHeight: 36,
            controlHeightLG: 48,
          },
          Modal: {
            borderRadius: 10,
            borderRadiusLG: 12,
            borderRadiusSM: 10,
          },
        },
        token: {
          colorPrimary: variables.colorPrimary,
        },
      }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={renderRoutes(routes)} />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
