import Head from 'next/head';
import Link from 'next/link';
import { FCC } from '~/lib/types';
import styles from '~/styles/Layout.module.scss';

export const Layout: FCC = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>GitHub Searcher</title>
                <meta name="description" content="GitHub Searcher" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <Link href="/">
                    <a>
                        <h1>GitHub Searcher</h1>
                    </a>
                </Link>
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <a href="https://www.linkedin.com/in/koliesnikov" target="_blank" rel="noopener noreferrer">
                    Koliesnikov Vladyslav
                </a>
            </footer>
        </div>
    );
};
