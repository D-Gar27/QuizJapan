import Link from 'next/link';
import style from '../styles/Home.module.scss';

interface Props {
  link: string;
  text: string;
  classname?: string;
}

const Cate = ({ link, text, classname }: Props) => {
  return (
    <Link href={`${link}`} passHref>
      <div className={style.level}>
        <p className={style[`${classname}`]}>{text}</p>
      </div>
    </Link>
  );
};

export default Cate;
