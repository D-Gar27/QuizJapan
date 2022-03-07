import Head from 'next/head';
import List from '../../components/List';
import { Category } from '../../public/data/vocabulary/cate';
import style from '../../styles/Home.module.scss';

const Vocabulary = () => {
  return (
    <>
      <Head>
        <title>Vocabulary | Quiz Japan</title>
      </Head>
      <main className={style.topPage}>
        {Category.map((cate, i) => (
          <List
            key={cate}
            text={[cate]}
            link={`/vocabulary/${cate.toLowerCase().split(' ').join('-')}`}
            number={i + 1}
          />
        ))}
      </main>
    </>
  );
};

export default Vocabulary;
