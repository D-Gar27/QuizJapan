import Link from 'next/link';
import style from '../styles/Home.module.scss';
interface Props {
  link: string;
  text: string[];
  number: number;
}

const List = ({ link, number, text }: Props) => {
  return (
    <Link href={`${link}`} passHref>
      <div className={style.cateList}>
        {' '}
        <span>{number}</span>
        {text.length > 7 ? text.join(' , ') : text[0]}
      </div>
    </Link>
  );
};

export default List;
