'use client';

import Link from 'next/link';
import { IconButton } from '@/components/Atoms/IconButton/IconButton';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { PagesNavigationBarProps } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar.types';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const PagesNavigationBar = ({ pages }: PagesNavigationBarProps) => {
	const pathname = usePathname();
	const [isHovered, setIsHovered] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	return (
		<div className="relative overflow-x-auto w-full no-scrollbar">
			<div
				className="flex w-max gap-5 relative items-center"
				onMouseLeave={() => {
					const hoverTimer = setTimeout(
						() => setIsHovered(null),
						400
					);
					setTimer(hoverTimer);
				}}
			>
				{pages.map(({ title, id, type, position }) => (
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
						<Link href={id}>
							<TabCard
								content={title}
								icon={type}
								iconColor={
									pathname === `/${id}` ? 'active' : 'default'
								}
								state={
									pathname === `/${id}` ? 'active' : 'default'
								}
							/>
						</Link>
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
		</div>
	);
};

const DottedLine = () => (
	<div className="border-t-2 border-dashed border-[#C0C0C0] absolute w-full top-1/2 transform -translate-y-1/2 z-0" />
);

export { PagesNavigationBar };
