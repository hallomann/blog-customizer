// Компонент для отображения опции в выпадающем списке
import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import type { MouseEventHandler } from 'react';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

// Типы пропсов компонента Option
type OptionProps = {
	option: OptionType; // Объект опции
	onClick: (value: OptionType['value']) => void;
	isActive: boolean; 
};

export const Option = ({ option, onClick, isActive }: OptionProps) => {
	const { value, title, optionClassName, className } = option;
	const optionRef = useRef<HTMLLIElement>(null);

	// Эффект для автофокуса
	useEffect(() => {
		if (isActive && optionRef.current) {
			optionRef.current.focus();
		}
	}, [isActive]);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, {[styles.active]: isActive}, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}
		>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title} 
			</Text>
		</li>
	);
};
