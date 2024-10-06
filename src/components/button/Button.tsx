// Импортируем необходимые зависимости
import React from 'react';
import clsx from 'clsx';
import { Text } from 'components/text';
import styles from './Button.module.scss';

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'reset' | 'apply';
};

// Компонент кнопки
export const Button = ({ title, onClick, type = 'button', variant }: ButtonProps) => {
  const buttonClass = clsx(styles.button, variant && styles[variant]);

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {/* Использование компонента Text для отображения текста кнопки с применением стилей в зависимости от варианта */}
      <Text className={clsx(styles.text, variant && styles[variant])} weight={800} uppercase>
        {title}
      </Text>
    </button>
  );
};
