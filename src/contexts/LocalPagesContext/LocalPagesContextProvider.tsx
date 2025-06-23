'use client';

import { useLocalPages } from '@/contexts/LocalPagesContext/hooks/useLocalPages';
import { LocalPagesContext } from '@/contexts/LocalPagesContext/LocalPagesContext';
import { ReactNode } from 'react';
import { MOCKED_PAGES } from '@/helpers/mockPages';

export const LocalPagesContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const hook = useLocalPages(MOCKED_PAGES);

	return (
		<LocalPagesContext value={{ ...hook }}>{children}</LocalPagesContext>
	);
};
