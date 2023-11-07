import { useState } from 'react';

import { useSetChain } from '@web3-onboard/react';
import { Button, Space, Typography } from 'antd';

import scrollLogo from '@assets/images/scroll-logo.png';
import { ChainId } from '@root/constants';
import { ModalBodyProps } from '@root/interfaces';

export default function SwitchChainModalBody({ closeModal }: ModalBodyProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setChain] = useSetChain();

  const handleDisconnect = () => {
    closeModal();
  };

  const handleSwitchNetwork = async () => {
    setIsLoading(true);
    await setChain({
      chainId: ChainId.Scroll as any,
    });
    setIsLoading(false);
  };

  return (
    <div className="text-center">
      <img src={scrollLogo} alt="switch-network" className="h-16 mb-5" />

      <Typography.Title level={4}>Your wallet is not on the chosen network</Typography.Title>
      <Typography className="text-zinc-500">
        You have connected to a different network from Scroll Mainnet. Please click the button below
        to change it.
      </Typography>

      <Space direction="horizontal" className="mt-5">
        <Button onClick={handleDisconnect} disabled={isLoading}>
          Disconnect
        </Button>
        <Button type="primary" onClick={handleSwitchNetwork} loading={isLoading}>
          Switch network
        </Button>
      </Space>
    </div>
  );
}
