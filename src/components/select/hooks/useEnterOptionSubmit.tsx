import { useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
	onClick: (value: OptionType['value']) => void;
	value: OptionType['value'];
	optionRef: React.RefObject<HTMLLIElement>; // Ссылка на HTML элемент <li>, к которому привязывается обработчик события
};

export const useEnterOptionSubmit = ({
	onClick,
	value,
	optionRef,
}: UseEnterOptionSubmit) => {
	useEffect(() => {
		const option = optionRef.current;
		if (!option) return;
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === 'Enter') { // Проверяем, является ли активный элемент нашим элементом и была ли нажата клавиша Enter
				onClick(value);
			}
		};

		option.addEventListener('keydown', handleEnterKeyDown);
		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown); // Удаляем обработчик события при размонтировании компонента
		};
	}, [value, onClick, optionRef]); // Зависимости, при изменении которых будет перезапускаться useEffect
};
