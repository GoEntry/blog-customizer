import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	onClick: (event: React.MouseEvent) => void; // Обработчик клика
	state?: boolean; // Состояние кнопки (открыто/закрыто)
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, state }) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.active]: state, // Добавляем класс active при открытии
			})}
			onClick={onClick} // Передаем обработчик клика
		>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow} />
		</div>
	);
};
