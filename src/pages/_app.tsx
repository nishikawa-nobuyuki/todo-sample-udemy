import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import LoadingScreen from '@/components/common/LoadingScreen';

import '@/styles/globals.css';

const DynamicContainer = dynamic(() => import('../components/common/NoopContainer'), {
  ssr: false,
});

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps): JSX.Element {
  return (
    <DynamicContainer>
      <RecoilRoot>
        <Suspense fallback={<LoadingScreen />}>
          <Component {...pageProps} />
        </Suspense>
      </RecoilRoot>
    </DynamicContainer>
  );
}
export default MyApp;
