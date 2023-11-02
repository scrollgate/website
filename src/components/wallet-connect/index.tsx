import React, { useEffect } from 'react';

import { useConnectWallet } from '@web3-onboard/react';
import { Button } from 'antd';
import { ethers } from 'ethers';

import { useEtherWalletStore } from '@root/services/store';

const WalletConnect = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const { setProvider } = useEtherWalletStore();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.BrowserProvider(wallet.provider));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return wallet?.provider && wallet.accounts[0] ? null : (
    <Button
      loading={connecting}
      onClick={() => connect()}
      className="button-high-light"
      type="primary"
    >
      Connect wallet
    </Button>
  );
};

export default React.memo(WalletConnect);
