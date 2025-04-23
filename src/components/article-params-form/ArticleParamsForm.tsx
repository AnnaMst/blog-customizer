import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { fontColors, OptionType, fontFamilyOptions, fontSizeOptions, defaultArticleState, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text'

type Props = {
	initialState: typeof defaultArticleState;
	onApply: (styles: typeof defaultArticleState) => void;
	onReset: () => void;
  };
  
  export const ArticleParamsForm = ({ initialState, onApply, onReset }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
  
	const [selectedColor, setSelectedColor] = useState(initialState.fontColor);
	const [selectedFont, setSelectedFont] = useState(initialState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(initialState.fontSizeOption);
	const [selectedBackground, setSelectedBackground] = useState(initialState.backgroundColor);
	const [selectedWidth, setSelectedWidth] = useState(initialState.contentWidth);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
  
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
		<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(prev => !prev)} />
		<aside ref={sidebarRef} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
		  <form className={styles.form} onSubmit={handleSubmitClick}>
			<div>
				<Text
					children='задайте параметры'
					as='h2'
					size= {31}
					weight={800}
					fontStyle='normal'
					uppercase={true}
				/>
			</div>
		  	<div>
				<ul>
					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						title='шрифт'
						onChange={setSelectedFont}
						
					/>
				</ul>
			</div>
			<div>
				<ul>
					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						title='размер шрифта'
					/>
				</ul>
			</div>
			<div>
				<ul>
					<Select
						options={fontColors}
						selected={selectedColor}
						title='выберите цвет'
						onChange={setSelectedColor}
						
					/>
				</ul>
			</div>
			<div>
				<Separator
				/>
			</div>
			<div>
				<ul>
					<Select
						options={backgroundColors}
						selected={selectedBackground}
						title='цвет фона'
						onChange={setSelectedBackground}					
					/>
				</ul>
			</div>
			<div>
				<ul>
					<Select
						options={contentWidthArr}
						selected={selectedWidth}
						title='ширина контента'
						onChange={setSelectedWidth}
						
					/>
				</ul>
			</div>
            <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='button' type='clear' onClick={handleResetClick} />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};