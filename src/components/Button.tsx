import { useEffect, useState } from 'react'
import { Sphere } from '@spherelabs/lite-sdk'
import { useWallet } from '@solana/wallet-adapter-react'

export const Button = ({ units, id }: any) => {
      const reactWallet = useWallet()
      const [sphere, setSphere] = useState<Sphere>()
      const [txSig, setTxSig] = useState<string>('')

      useEffect(() => {
        (async() => {
            if (reactWallet && reactWallet.connected) {
                try{
                    const _sphere = new Sphere({
                        env: 'mainnet',
                        rpcUrl: 'https://solana-mainnet.g.alchemy.com/v2/UesFjy66kB4g4BEa1-JFNCEYIP_FxXvF',
                        reactWallet,
                    })
                    await _sphere.prepareFrontend()
                    setSphere(_sphere)
                } catch(error){
                    console.log(error)
                }
            }
        })()
      }, [reactWallet])

      const onClick = async () => {
            try {
                  const _txSig = await sphere?.product.purchase({
                        id,
                        units,
                  }) as string
                  setTxSig(_txSig)
            } catch (error) {
                  console.log(error)
            }
      }

      return (
            <>
                  {txSig ? (
                        <p>transactionSignature: {txSig}</p>
                  ) : (
                        <button className="buttonPurchase" onClick={onClick}>Purchase Product</button>
                  )}
            </>
      )
}
