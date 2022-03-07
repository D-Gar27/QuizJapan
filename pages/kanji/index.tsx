import Head from 'next/head';
import List from '../../components/List';
import { Category } from '../../public/data/kanji/cate';
import style from '../../styles/Home.module.scss';

const Vocabulary = () => {
  return (
    <>
      <Head>
        <title>Kanji | Quiz Japan</title>
      </Head>
      <main className={style.topPage}>
        {Category.map((cate, i) => (
          <List
            key={cate.title}
            text={cate.list}
            link={`/kanji/${cate.title.toLowerCase().split(' ').join('-')}`}
            number={i + 1}
          />
        ))}
      </main>
    </>
  );
};

export default Vocabulary;
