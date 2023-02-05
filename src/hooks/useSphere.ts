import { useEffect, useState } from 'react';
import { Sphere } from '@spherelabs/lite-sdk';
import { WalletContextState } from '@solana/wallet-adapter-react';

export const useSphere = ({ reactWallet }: {
    reactWallet: WalletContextState | null
}) => {
  const env = "mainnet"
  const rpcUrl = "https://solana-mainnet.g.alchemy.com/v2/UesFjy66kB4g4BEa1-JFNCEYIP_FxXvF"  // Non-Secret Alchemy free tier RPC

  const [sphere, setSphere] = useState<Sphere>();

  useEffect(() => {
    if (reactWallet && reactWallet.connected) {
      const s = new Sphere({
        env,
        rpcUrl,
        reactWallet,
      });
      s.prepareFrontend()
      setSphere(s);
    }
  }, [reactWallet]);

  return {
    sphere,
  };
};