import Cate from '../components/Cate';
import style from '../styles/Home.module.scss';

const Level5 = () => {
  return (
    <>
      <main className={style.topPage}>
        <Cate link="/kanji" text="Kanji" />
        <Cate link="/vocabulary" text="Vocabulary" />
        <Cate link="/quiz" text="Quiz" />
      </main>
    </>
  );
};

export default Level5;
