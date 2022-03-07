import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../../styles/Category.module.scss';
import Flashcard from '../../components/Flashcard';
import Quiz from '../../components/Quiz';
import Head from 'next/head';

const Category = () => {
  const [vocabs, setVocabs] = useState<
    {
      id: string;
      'kanji + kana': string;
      kana: string;
      romaji: string;
      eng: string;
      my: string;
    }[]
  >();

  const [current, setCurrent] = useState<string>('learn');
  const { query } = useRouter();

  useEffect(() => {
    const fetchVocabs = async () => {
      const res = await axios.get(`/data/vocabulary/${query?.category}.json`);
      const data = await res.data;
      setVocabs(data);
    };
    if (query.category) {
      fetchVocabs();
    }
  }, [query.category]);

  return (
    <>
      <Head>
        <title>{query?.category} | Quiz Japan</title>
      </Head>
      <main className={style.vocab}>
        {current === 'learn' && (
          <>
            <section className={style.container}>
              <div className={`${style.vocabContainer} ${style.heading}`}>
                <p>Kanji</p>
                <p>Kana</p>
                <p className={style.romaji}>Romaji</p>
                <p className={style.eng}>English</p>
                <p>Myanmar</p>
              </div>
              {vocabs?.map((v) => (
                <div key={v.id} className={style.vocabContainer}>
                  <p>{v['kanji + kana']}</p>
                  <p>{v.kana ? v.kana : '-'}</p>
                  <p className={style.romaji}>{v.romaji}</p>
                  <p className={style.eng}>{v.eng}</p>
                  <p>{v.my}</p>
                </div>
              ))}
            </section>
            <div className={style.btns}>
              <button onClick={() => setCurrent('flashCard')}>
                Flash card
              </button>
              <button onClick={() => setCurrent('quiz')}>Quiz</button>
            </div>
          </>
        )}
        {current === 'flashCard' && (
          <Flashcard vocabs={vocabs} setCurrent={setCurrent} />
        )}
        {current === 'quiz' && <Quiz vocabs={vocabs} setCurrent={setCurrent} />}
      </main>
    </>
  );
};

export default Category;
