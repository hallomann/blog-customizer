import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { defaultArticleState } from 'src/constants/articleProps';

import { ArticleParamsForm } from '../article-params-form/ui/ArticleParamsForm';
import { Article } from '../article/ui/Article';

import styles from './styles/index.module.scss';
import './styles/index.scss';

/*
@TODO:
Нужно исправить
По чеклисту - “имена переменных — существительные, отражающие то, что в них хранится”.
Это относится в том числе и к стейту. Названия, например state appState, недостаточно информативны,
должны быть использованы более осмысленные имена - articleState formState и т.д.
*/

export const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);

	return (
		/* 
		@FIX:
		По семантике нужно помещать весь главный контент страницы после хэдера в тег main.
		*/
		<div
			className={clsx(styles.main)}
			/*
			@FIX:
			clsx можно не использовать, если только один селектор передается
			*/
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColorOption.value,
					'--container-width': appState.contentWidthOption.value,
					'--bg-color': appState.backgroundColorOption.value,
				} as CSSProperties
			}>
			<ArticleParamsForm updateAppState={setAppState} />
			<Article />
		</div>
	);
};
