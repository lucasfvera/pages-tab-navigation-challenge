'use client';

import { IconButton } from '@/components/Atoms/IconButton/IconButton';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { TabCardIconsProps } from '@/components/Atoms/TabCard/TabCardIcons';
import { useState } from 'react';

interface Page {
	id: string; // This should be an UUID from the backend
	position: number;
	title: string;
	type: TabCardIconsProps['type'];
}

const MOCKED_PAGES: Page[] = [
	{
		id: 'uuid-1',
		position: 1,
		title: 'Active',
		type: 'info',
	},
	{
		id: 'uuid-2',
		position: 2,
		title: 'Default',
		type: 'page',
	},
	{
		id: 'uuid-3',
		position: 3,
		title: 'Info',
		type: 'ending',
	},
];

const PagesNavigationBar = () => {
	const [isHovered, setIsHovered] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	return (
		<div
			className="flex w-fit gap-5 relative items-center py-6"
			onMouseLeave={() => {
				const hoverTimer = setTimeout(() => setIsHovered(null), 400);
				setTimer(hoverTimer);
			}}
		>
			{MOCKED_PAGES.map(({ title, id, type, position }) => (
				<div
					key={id}
					onMouseEnter={() => {
						if (timer) {
							clearTimeout(timer);
						}
						setIsHovered(id);
					}}
					className="flex z-10 items-center gap-5"
				>
					{isHovered === id && position !== 1 && <IconButton />}
					<TabCard
						content={title}
						icon={type}
						iconColor={title === 'Active' ? 'active' : 'default'}
						state={title === 'Active' ? 'active' : 'default'}
					/>
					{isHovered === id && <IconButton />}
				</div>
			))}
			<TabCard
				content={'Add page'}
				icon={'add'}
				state={'active'}
				iconColor={'black'}
			/>
			<DottedLine />
		</div>
	);
};

const DottedLine = () => {
	return (
		<div className="border-t-2 border-dashed border-[#C0C0C0] absolute w-full top-1/2 transform -translate-y-1/2 z-0" />
	);
};

export { PagesNavigationBar };
