import { Button, Space, Typography } from 'antd';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import notFoundPage from '@assets/images/not-found-page.png';
import { ThemeMode } from '@root/constants';
import { useThemeStore } from '@root/services/store';
import { getDeployPath } from '@root/utils';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const appTheme = useThemeStore((state) => state.appTheme);
  const isDarkTheme = appTheme === ThemeMode.Dark;

  const handleBackToHome = async () => {
    navigate(getDeployPath());
  };

  return (
    <div className={clsx('min-h-screen', { 'bg-dark': isDarkTheme, 'bg-light': !isDarkTheme })}>
      <Helmet>
        <title>ScrollGate - 404</title>
      </Helmet>

      <div className="flex justify-center pt-20">
        <Space className="text-center" direction="vertical" size={16}>
          <Typography.Title level={2} className="mb-0">
            {t('pageTitle.notFound')}
          </Typography.Title>

          <Typography.Paragraph className="font--16 mb-0">
            {t(
              'pages.notFoundPage.message',
              'Oops! 😖 The requested URL was not found on this server.'
            )}
          </Typography.Paragraph>

          <Button type="primary" className="mt-6" onClick={handleBackToHome}>
            {t('pages.notFoundPage.backToHome', 'Back to home')}
          </Button>

          <img src={notFoundPage} alt="not-found" className="h-[500px]" />
        </Space>
      </div>
    </div>
  );
}
