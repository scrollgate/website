import type { TokenSymbol } from '@web3-onboard/common';
import { BrowserProvider, Network, Signer } from 'ethers';

export interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

export interface EtherWalletConfig {
  provider: BrowserProvider | null;
  signer: Signer | null;
  network: Network | null;
  isSupportedChain: boolean;
  setProvider: (provider: BrowserProvider) => void;
}
