import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

export type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};

// Основной компонент Select
export const Select = ({
  options,
  placeholder,
  selected,
  onChange = () => {},
  onClose,
  title
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  

useEnterSubmit({
  placeholderRef,
  onChange: setIsOpen,
});

useOutsideClickClose({
  isOpen,
  rootRef,
  onClose,
  onChange: setIsOpen,
});

  useEffect(() => {
	if (isOpen){
        const handleKeyDown = (event: KeyboardEvent) => {
			if (isOpen) {
				setIsKeyboardNavigation(true);
				if (event.key === "ArrowDown" || event.key === "ArrowUp") {
					event.preventDefault();
				if (isOpen) {
					if (event.key === "ArrowDown") {
						setActiveIndex((prevIndex) => (prevIndex + 1) % options.length);
						event.preventDefault();
						event.stopPropagation(); 
					} else if (event.key === "ArrowUp") {
						setActiveIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
						event.preventDefault();
						event.stopPropagation(); 
					} else if (event.key === "Enter") {
						const option = options[activeIndex];
						onChange(option);
						setIsOpen(false);
					}
			}
			
			};}
			}
			document.addEventListener('keydown', handleKeyDown);
     		return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, options, onChange, activeIndex]);

	useEffect(() => {
		if (!isOpen) {
		  setIsKeyboardNavigation(false);
		}
	  }, [isOpen]);

// Обработчики для клика
const handleOptionClick = (option: OptionType) => {
    setIsOpen(false); 
    onChange?.(option); 
	setIsKeyboardNavigation(false); 
  };
  
const handlePlaceHolderClick = () => {
    setIsOpen(!isOpen); 
	setIsKeyboardNavigation(false);
  };

  // Рендер
  return (
	<div className={styles.container}>
		{title && (
			<>
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			</>
		)}
		<div
			className={styles.selectWrapper}
			ref={rootRef}
			data-is-active={isOpen}
			data-testid='selectWrapper'>
			<img
				src={arrowDown}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
			<div
				className={clsx(
					styles.placeholder,
					styles[selected?.optionClassName || '']
				)}
				data-status={status}
				data-selected={!!selected?.value}
				onClick={handlePlaceHolderClick}
				role='button'
				tabIndex={0}
				ref={placeholderRef}>
				<Text
					family={
						isFontFamilyClass(selected?.className)
							? selected?.className
							: undefined
					}>
					{selected?.title || placeholder}
				</Text>
			</div>
			{isOpen && (
				<ul className={styles.select} data-testid='selectDropdown'>
					{options
						.filter((option) => selected?.value !== option.value)
						.map((option, index) => (
							<Option key={option.value} option={option} onClick={() => handleOptionClick(option)} isActive={isKeyboardNavigation && index === activeIndex} />
						))}
				</ul>
			)}
		</div>
	</div>
);
};