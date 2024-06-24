import css from './LoadMoreBtn.module.css';
import { ILoadMoreBtnProps } from './types';

export default function LoadMoreBtn({ onClick }: ILoadMoreBtnProps) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}
