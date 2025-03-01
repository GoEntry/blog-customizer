import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	onApply: (newParams: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	params,
	onApply,
	onReset,
}) => {
	const [formParams, setFormParams] = useState(params); // Локальное состояние формы
	const [isOpen, setIsOpen] = useState(false); // Управление открытием/закрытием панели
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const sidebarStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	// Обработчик изменения параметров
	const handleChange = (field: keyof ArticleStateType, newValue: any) => {
		setFormParams((prev) => ({ ...prev, [field]: newValue }));
	};

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleCloseForm = () => {
		setIsOpen(false);
	};

	// Обработчик отправки формы
	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formParams);
	};

	useOutsideClickClose({
		isOpen,
		onChange: handleCloseForm,
		rootRef: sidebarRef,
	});

	// Обработчик сброса параметров
	const handleResetStyles = () => {
		setFormParams({ ...defaultArticleState });
		onReset();
	};

	return (
		<div className={styles.formWrapper}>
			{/* Кнопка открытия/закрытия панели */}
			<ArrowButton onClick={handleClick} state={isOpen} />

			{/* Панель настроек */}
			<aside className={sidebarStyle} ref={sidebarRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/* Выбор шрифта */}
					<Select
						title='Шрифт'
						selected={formParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					{/* Выбор размера шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					{/* Выбор цвета текста */}
					<Select
						title='Цвет текста'
						selected={formParams.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
					/>
					{/* Разделитель */}
					<Separator />
					{/* Выбор цвета фона */}
					<Select
						title='Цвет фона'
						selected={formParams.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					{/* Выбор ширины контента */}
					<Select
						title='Ширина контента'
						selected={formParams.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					{/* Кнопки управления */}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='button'
							onClick={handleResetStyles}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
