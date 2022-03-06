import { useMemo, useState } from 'react';
import style from '../styles/components/FlashCard.module.scss';
import { motion } from 'framer-motion';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { HiArrowNarrowRight } from 'react-icons/hi';

interface Props {
  vocabs?: {
    id: string;
    'kanji + kana': string;
    kana: string;
    romaji: string;
    eng: string;
    my: string;
  }[];
  setCurrent: any;
}

const Flashcard = ({ vocabs, setCurrent }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean>(false);
  const shuffled = useMemo(
    () => vocabs?.sort(() => Math.random() - 0.5),
    [vocabs]
  );
  return (
    <section className={style.flashCard}>
      <button onClick={() => setCurrent('learn')} className={style.b2h}>
        <BsChevronDoubleLeft /> Back
      </button>
      {shuffled && currentIndex < shuffled?.length ? (
        <>
          <article className={style.card}>
            <motion.div className={style.question}>
              <p className={style.kanji}>
                {shuffled[currentIndex]['kanji + kana']}
              </p>
              {shuffled[currentIndex].kana && (
                <p className={style.kana}>( {shuffled[currentIndex].kana} )</p>
              )}
              <p className={style.kana}>( {shuffled[currentIndex].romaji} )</p>
            </motion.div>
            {revealed && (
              <motion.div
                animate={{
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    duration: 1,
                  },
                }}
                initial={{ opacity: 0 }}
                className={style.answer}
              >
                <p className={style.kana}>{shuffled[currentIndex].eng}</p>
                <p className={style.kana}>{shuffled[currentIndex].my}</p>
              </motion.div>
            )}
            <button onClick={() => setRevealed(true)}>Reveal</button>
          </article>

          <button
            onClick={() => {
              setRevealed(false);
              setCurrentIndex((prev) => prev + 1);
            }}
            className={style.next}
          >
            Next <HiArrowNarrowRight />
          </button>
        </>
      ) : (
        <button className={style.restart} onClick={() => setCurrentIndex(0)}>
          Restart
        </button>
      )}
    </section>
  );
};

export default Flashcard;
