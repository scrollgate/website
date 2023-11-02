import { create } from 'zustand';

import { CHAINS } from '@root/constants';
import { EtherWalletConfig } from '@root/interfaces';

const useEtherWalletStore = create<EtherWalletConfig>((set) => ({
  provider: null,
  signer: null,
  network: null,
  isSupportedChain: true,
  async setProvider(provider) {
    const network = await provider.getNetwork();
    set({
      provider,
      network,
      isSupportedChain: Object.keys(CHAINS).includes(network.chainId.toString()),
      signer: await provider.getSigner(),
    });
  },
}));

export default useEtherWalletStore;
