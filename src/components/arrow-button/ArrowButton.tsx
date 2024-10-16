// Импортируем изображение стрелки и стили
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
  return (
    <button
      aria-label="Открыть или закрыть форму параметров статьи"
      className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      onClick={onClick}
      type="button"
    >
      <img
        src={arrow}
        alt="Квадрат, в котором расположена стрелка противоположного цвета"
        className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
      />
    </button>
  );
};
