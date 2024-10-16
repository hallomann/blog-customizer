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
		if (!isOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.(!isOpen);
			}
		};

		const handleClick = (e: MouseEvent) => {
			const { target } = e;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose?.(!isOpen);
			}
		};

		window.addEventListener('keydown', handleEscape);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleEscape);
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, rootRef]);
};
