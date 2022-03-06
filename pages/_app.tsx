import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Image from 'next/image';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <figure className="bg-img">
        <Image
          src={'/bg.jpg'}
          alt="background image"
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
