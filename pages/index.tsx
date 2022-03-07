import Head from 'next/head';
import Cate from '../components/Cate';
import style from '../styles/Home.module.scss';

const Level5 = () => {
  return (
    <>
      <Head>
        <title>Quiz Japan</title>
      </Head>
      <main className={style.topPage}>
        <Cate link="/kanji" text="Kanji" />
        <Cate link="/vocabulary" text="Vocabulary" />
        <Cate link="/quiz" text="Quiz" />
      </main>
    </>
  );
};

export default Level5;
