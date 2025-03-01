import { createRoot } from 'react-dom/client';
import { StrictMode, useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App: React.FC = () => {
	// Состояние для хранения текущих параметров статьи
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчик применения новых параметров
	const handleApply = (newParams: ArticleStateType) => {
		setArticleParams(newParams);
	};

	// Обработчик сброса параметров к начальным значениям
	const handleReset = () => {
		setArticleParams(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Форма настроек */}
			<ArticleParamsForm
				params={articleParams}
				onApply={handleApply}
				onReset={handleReset}
			/>

			{/* Статья */}
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
