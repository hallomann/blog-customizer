import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>;
	onClose: (value: boolean) => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			event.key == 'Escape' && isOpen && onClose?.(!isOpen);
		};

		const handleClick = (e: MouseEvent) => {
			const { target } = e;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.(!isOpen);
				/*
				@TODO:
				Нужно исправить
				Нужно останавливать эффект, если форма закрыта, чтобы не навешивать обработчик if (!isOpen) return;
				*/
			}
		};

		window.addEventListener('keydown', handleEscape);
		window.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose]);
};