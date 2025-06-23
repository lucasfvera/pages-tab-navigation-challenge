'use client';

import { LocalPagesContext } from '@/contexts/LocalPagesContext/LocalPagesContext';
import { useContext } from 'react';

export const useLocalPagesContext = () => {
	const context = useContext(LocalPagesContext);

	if (!context) {
		throw new Error('Hook must be used in a LocalPagesContextProvider');
	}
	return context;
};
