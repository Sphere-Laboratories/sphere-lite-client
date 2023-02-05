import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '../components/Button'

const WalletDisconnectButtonDynamic = dynamic(
      async () =>
            (await import('@solana/wallet-adapter-react-ui'))
                  .WalletDisconnectButton,
      { ssr: false }
)
const WalletMultiButtonDynamic = dynamic(
      async () =>
            (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
      { ssr: false }
)

const Home: NextPage = () => {

      const reactWallet = useWallet()
      const units = 2
      const id = 'product-4d081945-7dab-4b15-8cb2-632ae5818a2f'

      return (
            <div className={styles.container}>
                  <Head>
                        <title>Sphere Lite Client</title>
                        <meta
                              name="description"
                              content="A Simple App Demonstrating Client Interaction with Sphere"
                        />
                        <link rel="icon" href="/favicon.ico" />
                  </Head>

                  <main className={styles.main}>
                        <h1 className={styles.title}>
                              Welcome to{' '}
                              <a href="https://www.sphere.engineer">
                                    Sphere Lite!
                              </a>
                        </h1>
                        <div className={styles.walletButtons}>
                              <WalletMultiButtonDynamic />
                              <WalletDisconnectButtonDynamic />
                        </div>
                        {reactWallet.connected && (
                              <div className={styles.buttonContainer}>
                                    <Button id={id} units={units}/>
                              </div>
                        )}
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
      )
}

export default Home
