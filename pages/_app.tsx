import { configure } from 'mobx';
import type { AppProps } from 'next/app';
import 'reflect-metadata';
import { AppProvider } from '../services/app';
import '../styles/globals.scss';

configure({
    enforceActions: 'always',
    useProxies: 'never',
});

function AppRoot({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

function MyApp(props: AppProps) {
    return (
        <AppProvider>
            <AppRoot {...props} />
        </AppProvider>
    );
}

export default MyApp;
