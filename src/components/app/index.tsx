import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { defaultArticleState } from 'src/constants/articleProps';

import { ArticleParamsForm } from '../article-params-form/ui/ArticleParamsForm';
import { Article } from '../article/ui/Article';

import styles from './styles/index.module.scss';
import './styles/index.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColorOption.value,
					'--container-width': articleState.contentWidthOption.value,
					'--bg-color': articleState.backgroundColorOption.value,
				} as CSSProperties
			}>
			<ArticleParamsForm updateAppState={setArticleState} />
			<Article />
		</main>
	);
};
