import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.css';
import { useSphere } from '../hooks/useSphere'
import { useWallet } from '@solana/wallet-adapter-react';

const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
    { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const Home: NextPage = () => {

    const reactWallet = useWallet()
    const { sphere } = useSphere({ reactWallet })
    const productId = "product-4d081945-7dab-4b15-8cb2-632ae5818a2f"

    const [txSig, setTxSig] = React.useState<string>('')

    const onClick = async() => {
        try{
            const _txSig = await sphere?.product.purchase({
                id: productId,
                units: 2,
            }) as string
            setTxSig(_txSig)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Sphere Lite Client</title>
                <meta name="description" content="A Simple App Demonstrating Client Interaction with Sphere" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://www.sphere.engineer">Sphere Lite!</a>
                </h1>
                <div className={styles.walletButtons}>
                    <WalletMultiButtonDynamic />
                    <WalletDisconnectButtonDynamic />
                </div>
                {(reactWallet.connected) && 
                <>
                {(!txSig) ? 
                <>
                    <p className={styles.description}>
                        Click the button below to purchase <code className={styles.code}>{productId}</code>
                    </p>
                    <button className={styles.purchaseButton} onClick={onClick}>
                        Purchase Product
                    </button> 
                </>
                    : <p className={styles.description}>Purchased Product with txSig: <code className={styles.code}>{txSig}</code></p>}
                </>
                }
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Sphere
                </a>
            </footer>
        </div>
    );
};

export default Home;
