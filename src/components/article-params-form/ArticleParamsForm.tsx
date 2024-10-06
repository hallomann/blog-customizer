// Импортируем необходимые ресурсы и компоненты
import React, { useState, forwardRef, useCallback } from 'react';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/index';
import { Select } from '../select/Select';
import { fontSizeOptions, fontFamilyOptions, fontColorOptions, backgroundColorOptions, contentWidthOptions, OptionType, defaultArticleState } from '../../constants/articleProps';
import { Separator } from '../separator';

export type ArticleParamsFormProps = {
  onClose: () => void;
  isOpen: boolean;
  onApply: (styles: {
    fontFamily?: string;
    fontSize: string;
    fontColor?: string;
    backgroundColor?: string;
    contentWidth?: string;
  }) => void;
  onReset: () => void;
};

// Компонент формы для настройки статьи
export const ArticleParamsForm = forwardRef<HTMLDivElement, ArticleParamsFormProps>(
  ({ onClose, isOpen, onApply, onReset }, ref) => {
    const [selectedFont, setSelectedFont] = useState<OptionType | null>(fontFamilyOptions[0]);
    const [localFontSize, setLocalFontSize] = useState(fontSizeOptions[0].value);
    const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(fontColorOptions[0]);
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType | null>(backgroundColorOptions[0]);
    const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType | null>(contentWidthOptions[0]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      onApply({
        fontFamily: selectedFont?.className,
        fontSize: localFontSize,
        fontColor: selectedFontColor?.value,
        backgroundColor: selectedBackgroundColor?.value,
        contentWidth: selectedContentWidth?.value,
      });
    }, [onApply, selectedFont, localFontSize, selectedFontColor, selectedBackgroundColor, selectedContentWidth]);
    
    const handleResetForm = useCallback(() => {
      setSelectedFont(fontFamilyOptions[0]);
      setLocalFontSize(defaultArticleState.fontSizeOption.value);
      setSelectedFontColor(fontColorOptions[0]);
      setSelectedBackgroundColor(backgroundColorOptions[0]);
      setSelectedContentWidth(contentWidthOptions[0]);
      onReset();
    }, [onReset]);

    return (
      <aside ref={ref} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}> {/* Добавление класса для открытого состояния */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Компоненты для выбора настроек */}
          <Select
            selected={selectedFont}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={setSelectedFont}
            title="Шрифт"
          />
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={fontSizeOptions.find(option => option.value === localFontSize) || fontSizeOptions[0]}
            onChange={(option) => setLocalFontSize(option.value)}
            title="Размер шрифта"
          />
          <Select
            selected={selectedFontColor}
            options={fontColorOptions}
            placeholder="Выберите цвет шрифта"
            onChange={setSelectedFontColor}
            title="Цвет шрифта"
          />
          <Separator /> {/* Визуальный разделитель */}
          <Select
            selected={selectedBackgroundColor}
            options={backgroundColorOptions}
            placeholder="Выберите цвет фона"
            onChange={setSelectedBackgroundColor}
            title="Цвет фона"
          />
          <Select
            selected={selectedContentWidth}
            options={contentWidthOptions}
            placeholder="Выберите ширину контента"
            onChange={setSelectedContentWidth}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="button" onClick={handleResetForm} variant="reset"/>
            <Button title="Применить" type="submit" variant="apply"/>
          </div>
        </form>
      </aside>
    );
  }
);
