import { useLayoutEffect, useState } from 'react';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { Button, Dropdown, Grid, Layout, Popover, Space, Typography } from 'antd';
import clsx from 'clsx';
import { useMatches, useNavigate } from 'react-router-dom';

import logo from '@assets/images/logo.png';
import { ChainId, HEADER_MENU, ModalSize } from '@root/constants';
import { useModal } from '@root/hooks';
import { useEtherWalletStore } from '@root/services/store';
import { getDeployPath } from '@root/utils';

import SettingWeb from '../setting-web/SettingWeb';
import SwitchChainModalBody from '../switch-chain-modal';
import WalletConnect from '../wallet-connect';

const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function HeaderComponent() {
  const [openSetting, setOpenSetting] = useState(false);
  const navigate = useNavigate();
  const [{ wallet }] = useConnectWallet();
  const { isSupportedChain } = useEtherWalletStore();
  const { md } = useBreakpoint();
  const matches = useMatches();
  const [isLoading, setIsLoading] = useState(false);
  const [, setChain] = useSetChain();

  const {
    open: openSwitchNetwork,
    ModalComponent: SwitchNetworkModal,
    close: closeSwitchNetwork,
  } = useModal({
    modalBody: SwitchChainModalBody,
    displayFooter: false,
    width: ModalSize.SM,
  });
  const queryMatches = matches.filter((item) => !!item.handle);
  const activeKey = (queryMatches.filter((item) => !!(item.handle as any)?.key)[0]?.handle as any)
    ?.key;

  useLayoutEffect(() => {
    if (!wallet?.accounts?.length) {
      return;
    }

    if (isSupportedChain) {
      closeSwitchNetwork();
    } else {
      openSwitchNetwork({
        title: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupportedChain, wallet?.accounts]);

  const handleNavigate = (href: string, isDisabled?: boolean) => {
    if (isDisabled) return;

    navigate(href);
  };

  const handleChange = ({ key }: any) => {
    switch (key) {
      default:
        return navigate(getDeployPath());
    }
  };

  const handleSwitchNetwork = async () => {
    setIsLoading(true);
    await setChain({
      chainId: ChainId.Scroll as any,
    });
    setIsLoading(false);
  };

  return (
    <>
      <Header className="flex items-center justify-between bg-transparent h-16">
        <Space direction="horizontal" size="small">
          <img
            src={logo}
            alt="logo"
            className="h-11 cursor-pointer mt-[-3px] xl:mt-[-4px]"
            onClick={() => navigate(getDeployPath())}
          />

          {md ? (
            <Space direction="horizontal" size="small">
              {HEADER_MENU.map((item) => (
                <Typography
                  key={item.key}
                  onClick={() => handleNavigate(item.href, item.disabled)}
                  className={clsx('font-semibold text-base ml-4', {
                    'text-primary': activeKey === item.key,
                    'cursor-pointer': !item.disabled,
                  })}
                >
                  {item.label}
                </Typography>
              ))}
            </Space>
          ) : (
            <Dropdown
              trigger={['click']}
              menu={{
                items: HEADER_MENU,
                defaultSelectedKeys: [activeKey],
                onClick: handleChange,
              }}
            >
              <Button type="primary" className="ml-4" icon={<MenuUnfoldOutlined />} />
            </Dropdown>
          )}
        </Space>

        <div className="flex items-center">
          {!isSupportedChain && (
            <Button type="primary" onClick={handleSwitchNetwork} loading={isLoading}>
              Switch Network
            </Button>
          )}
          <WalletConnect />
          <Typography.Link
            href="https://github.com/scrollgate"
            className="flex"
            style={{ color: 'inherit' }}
            target="_blank"
          >
            <Icon icon="mdi:github" fontSize={24} className="cursor-pointer ml-5" />
          </Typography.Link>
          <Typography.Link
            href="https://discord.com"
            className="flex"
            style={{ color: 'inherit' }}
            target="_blank"
          >
            <Icon icon="ic:baseline-discord" fontSize={24} className="cursor-pointer ml-3" />
          </Typography.Link>
          <Typography.Link
            href="https://twitter.com/scroll_contract"
            className="flex"
            style={{ color: 'inherit' }}
            target="_blank"
          >
            <Icon icon="ri:twitter-x-fill" fontSize={20} className="cursor-pointer ml-3" />
          </Typography.Link>
          <Popover
            trigger="click"
            content={<SettingWeb handleClose={() => setOpenSetting(false)} />}
            open={openSetting}
            placement="topRight"
            onOpenChange={setOpenSetting}
          >
            <Icon icon="uil:setting" fontSize={32} className="cursor-pointer ml-3" />
          </Popover>
        </div>
      </Header>

      <SwitchNetworkModal />
    </>
  );
}
