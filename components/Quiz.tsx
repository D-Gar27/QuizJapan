import { useEffect, useMemo, useState } from 'react';
import style from '../styles/components/Quiz.module.scss';
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

const Quiz = ({ vocabs, setCurrent }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<
    { my: string; eng: string; id: string }[]
  >([]);
  const [correctAmount, setCorrectAmount] = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean>(false);
  const shuffled = useMemo(
    () => vocabs?.sort(() => Math.random() - 0.5),
    [vocabs]
  );
  useEffect(() => {
    if (shuffled && currentIndex < shuffled.length) {
      const filtered = shuffled
        .filter((v) => v.id !== shuffled[currentIndex].id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const randomAnswers = [...filtered, shuffled[currentIndex]];
      setAnswers(randomAnswers.sort(() => Math.random() - 0.5));
    }
  }, [currentIndex, shuffled]);

  return (
    <section className={style.flashCard}>
      <button onClick={() => setCurrent('learn')} className={style.b2h}>
        <BsChevronDoubleLeft /> Back
      </button>
      {shuffled && currentIndex < shuffled?.length && (
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
            <ul className={style.answer}>
              {answers &&
                answers.map((ans) => (
                  <Answer
                    key={ans.id}
                    ans={ans}
                    setRevealed={setRevealed}
                    answerID={shuffled[currentIndex].id}
                    revealed={revealed}
                    setCorrectAmount={setCorrectAmount}
                  />
                ))}
            </ul>
          </article>

          <button
            onClick={() => {
              setRevealed(false);
              setCurrentIndex(currentIndex + 1);
            }}
            className={style.next}
          >
            Next <HiArrowNarrowRight />
          </button>
        </>
      )}
      {shuffled && currentIndex >= shuffled?.length && (
        <>
          <p className={style.result}>
            You correctly answered {correctAmount} out of {shuffled.length}{' '}
            questions
          </p>
          {/* <button
            className={style.restart}
            onClick={() => {
              setCurrentIndex(0);
              setCorrectAmount(0);
            }}
          >
            Restart
          </button> */}
        </>
      )}
    </section>
  );
};

export default Quiz;

interface AnsProps {
  ans: {
    id: string;
    eng: string;
    my: string;
  };
  setRevealed: any;
  revealed: boolean;
  answerID: string;
  setCorrectAmount: any;
}

const Answer = ({
  ans: { id, my, eng },
  setRevealed,
  answerID,
  revealed,
  setCorrectAmount,
}: AnsProps) => {
  const checkAns = (id: string) => {
    setRevealed(true);
    if (answerID === id) {
      setCorrectAmount((prev: number) => prev + 1);
    }
  };
  return (
    <>
      {revealed ? (
        <li
          style={{
            border: answerID === id ? `solid 2px #70e000` : `solid 2px #ff3464`,
            backgroundColor:
              answerID === id
                ? `rgba(112, 224, 0,0.3)`
                : `rgba(255, 52, 100,0.3)`,
          }}
        >
          {eng} ( {my} )
        </li>
      ) : (
        <li onClick={() => checkAns(id)} className={style.unrevealed}>
          {eng} ( {my} )
        </li>
      )}
    </>
  );
};
