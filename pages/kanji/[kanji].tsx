import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../../styles/Category.module.scss';
import Flashcard from '../../components/FlashcardKanji';
import Quiz from '../../components/QuizKanji';

const Category = () => {
  const [kanji, setKanji] = useState<
    {
      id: string;
      kanji: string;
      onyomi: string;
      kunyomi: string;
      eng: string;
      my: string;
    }[]
  >();

  const [current, setCurrent] = useState<string>('learn');
  const { query } = useRouter();

  useEffect(() => {
    const fetchVocabs = async () => {
      const res = await axios.get(`/data/kanji/${query?.kanji}.json`);
      const data = await res.data;
      setKanji(data);
    };
    if (query.kanji) {
      fetchVocabs();
    }
  }, [query.kanji]);

  return (
    <main className={style.vocab}>
      {current === 'learn' && (
        <>
          <section className={style.container}>
            <div className={`${style.kanjiContainer} ${style.heading}`}>
              <p>Kanji</p>
              <p>Onyomi</p>
              <p>Kunyomi</p>
              <p className={style.eng}>English</p>
              <p>Myanmar</p>
            </div>
            {kanji?.map((k) => (
              <div key={k.id} className={style.kanjiContainer}>
                <p>{k.kanji}</p>
                <p>{k.onyomi ? k.onyomi : '-'}</p>
                <p>{k.kunyomi ? k.kunyomi : '-'}</p>
                <p className={style.eng}>{k.eng}</p>
                <p>{k.my}</p>
              </div>
            ))}
          </section>
          <div className={style.btns}>
            <button onClick={() => setCurrent('flashCard')}>Flash card</button>
            <button onClick={() => setCurrent('quiz')}>Quiz</button>
          </div>
        </>
      )}
      {current === 'flashCard' && (
        <Flashcard kanji={kanji} setCurrent={setCurrent} />
      )}
      {current === 'quiz' && <Quiz kanji={kanji} setCurrent={setCurrent} />}
    </main>
  );
};

export default Category;
