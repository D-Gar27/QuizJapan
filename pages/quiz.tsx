import Head from 'next/head';
import Link from 'next/link';
import style from '../styles/Quiz.module.scss';

const Quiz = () => {
  return (
    <>
      <Head>
        <title>Quiz | Quiz Japan</title>
      </Head>
      <section className={style.quiz}>
        <p>Coming soon...</p>
        <Link href={'/'} passHref>
          <a>Back to home page</a>
        </Link>
      </section>
    </>
  );
};

export default Quiz;
