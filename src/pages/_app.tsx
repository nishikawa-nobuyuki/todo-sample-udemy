import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorDialog from '@/components/common/ErrorDialog';
import ErrorFallbackApp from '@/components/common/ErrorFallbackApp';
import LoadingScreen from '@/components/common/LoadingScreen';

import '@/styles/globals.css';

const DynamicContainer = dynamic(() => import('../components/common/NoopContainer'), {
  ssr: false,
});

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps): JSX.Element {
  return (
    <DynamicContainer>
      <ErrorBoundary FallbackComponent={ErrorFallbackApp}>
        <Suspense fallback={<LoadingScreen />}>
          <Component {...pageProps} />
          <ErrorDialog />
        </Suspense>
      </ErrorBoundary>
    </DynamicContainer>
  );
}
export default MyApp;
