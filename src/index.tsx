import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


const App = () => {
	const [articleStyles, setArticleStyles] = useState(defaultArticleState);
  
	const handleApply = (newStyles: typeof defaultArticleState) => {
	  setArticleStyles(newStyles);
	};
  
	const handleReset = () => {
	  setArticleStyles(defaultArticleState);
	};
  
	return (
	  <main
		className={clsx(styles.main)}
		style={
		  {
			'--font-family': articleStyles.fontFamilyOption.value,
			'--font-size': articleStyles.fontSizeOption.value,
			'--font-color': articleStyles.fontColor.value,
			'--container-width': articleStyles.contentWidth.value,
			'--bg-color': articleStyles.backgroundColor.value,
		  } as CSSProperties
		}>
		<ArticleParamsForm
		  initialState={articleStyles}
		  onApply={handleApply}
		  onReset={handleReset}
		/>
		<Article fontFamily={{
				title: '',
				value: '',
				className: '',
				optionClassName: undefined
			}} fontSize={{
				title: '',
				value: '',
				className: '',
				optionClassName: undefined
			}} {...articleStyles} />
	  </main>
	);
  };
  
  


root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
