import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { fontColors, fontFamilyOptions, fontSizeOptions, defaultArticleState, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text'
import clsx from 'clsx';

type Props = {
	initialState: typeof defaultArticleState;
	onApply: (styles: typeof defaultArticleState) => void;
	onReset: () => void;
  };
  
  export const ArticleParamsForm = ({ initialState, onApply, onReset }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  
	const [selectedColor, setSelectedColor] = useState(initialState.fontColor);
	const [selectedFont, setSelectedFont] = useState(initialState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(initialState.fontSizeOption);
	const [selectedBackground, setSelectedBackground] = useState(initialState.backgroundColor);
	const [selectedWidth, setSelectedWidth] = useState(initialState.contentWidth);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);
  
	const handleSubmitClick = (e: React.FormEvent) => {
	  e.preventDefault();
	  onApply({
		fontColor: selectedColor,
		fontFamilyOption: selectedFont,
		fontSizeOption: selectedFontSize,
		backgroundColor: selectedBackground,
		contentWidth: selectedWidth,
	  });
	};
  
	const handleResetClick = () => {
	  setSelectedColor(initialState.fontColor);
	  setSelectedFont(initialState.fontFamilyOption);
	  setSelectedFontSize(initialState.fontSizeOption);
	  setSelectedBackground(initialState.backgroundColor);
	  setSelectedWidth(initialState.contentWidth);
	  onReset();
	};
  
	return (
	  <>
		<ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(prev => !prev)} />
		<aside ref={sidebarRef} className={clsx(styles.container, {[styles.container_open]: isMenuOpen})}>
		  <form className={styles.form} onSubmit={handleSubmitClick}>
			<Text
				children='задайте параметры'
				as='h2'
				size= {31}
				weight={800}
				fontStyle='normal'
				uppercase={true}
			/>
			<ul>
				<Select
					options={fontFamilyOptions}
					selected={selectedFont}
					title='шрифт'
					onChange={setSelectedFont}
						
				/>
			</ul>
			<ul>
				<RadioGroup
					name=''
					options={fontSizeOptions}
					selected={selectedFontSize}
					onChange={setSelectedFontSize}
					title='размер шрифта'
				/>
			</ul>
			<ul>
				<Select
					options={fontColors}
					selected={selectedColor}
					title='выберите цвет'
					onChange={setSelectedColor}
						
				/>
			</ul>
			<Separator
			/>
			<ul>
				<Select
					options={backgroundColors}
					selected={selectedBackground}
					title='цвет фона'
					onChange={setSelectedBackground}					
				/>
			</ul>
			<ul>
				<Select
					options={contentWidthArr}
					selected={selectedWidth}
					title='ширина контента'
					onChange={setSelectedWidth}	
				/>
			</ul>
          	<div className={styles.bottomContainer}>
            	<Button title='Сбросить' htmlType='button' type='clear' onClick={handleResetClick} />
            	<Button title='Применить' htmlType='submit' type='apply' />
          	</div>
        </form>
      </aside>
    </>
  );
};