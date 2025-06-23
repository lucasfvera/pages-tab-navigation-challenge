'use client';

import { Page } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLocalPages = (pages: Page[]) => {
	const router = useRouter();
	// Local state to mock updating pages
	const [localPages, setLocalPages] = useState(pages);
	// This method should actually be handled in the BE where we post a new page
	// and handle the response
	const createPage = (targetPosition: number) => {
		const uuid = window.crypto.randomUUID();
		const newPage = {
			id: uuid,
			position: targetPosition,
			title: 'New page',
			type: 'page' as const,
		};
		setLocalPages((prev) =>
			prev
				.map((page) => ({
					...page,
					position:
						page.position >= targetPosition
							? page.position + 1
							: page.position,
				}))
				.toSpliced(targetPosition, 0, newPage)
		);
		router.push(`/${uuid}`);
	};

	return { localPages, setLocalPages, createPage };
};

export type useLocalPagesReturnType = ReturnType<typeof useLocalPages>;
