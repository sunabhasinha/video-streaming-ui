import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleAnnotation } from '../redux/actions';
import { SHORTCUTS } from '../constants';

export const useKeyboardShortcuts = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const handleKeyDown = (e) => {
			const tagName = e.target.tagName.toLowerCase();
			if (
				tagName === 'input' ||
				tagName === 'textarea' ||
				e.target.isContentEditable
			) {
				return;
			}

			if (e.key.toLowerCase() === SHORTCUTS.TOGGLE_ANNOTATION.toLowerCase()) {
				dispatch(toggleAnnotation());
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [dispatch]);
};
