'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconButton } from '@/components/Atoms/IconButton/IconButton';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { PagesNavigationBarProps } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar.types';
import { usePathname } from 'next/navigation';
import { ContextMenu } from '@/components/Molecules/ContextMenu/ContextMenu';
import { useRouter } from 'next/navigation';

interface ContextMenuPosition {
	x: number;
	y: number;
}

const PagesNavigationBar = ({ pages }: PagesNavigationBarProps) => {
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

	const pathname = usePathname();
	const [isHovered, setIsHovered] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
		null
	);

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
				{localPages.map(({ title, id, type, position }) => (
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
						{isHovered === id && (
							<IconButton onClick={() => createPage(position)} />
						)}
						<Link
							href={id}
							onContextMenu={(e) => {
								e.preventDefault();
								const rectangle =
									e.currentTarget.getBoundingClientRect();
								setContextMenu({
									x: rectangle.x,
									y: rectangle.y,
								});
							}}
						>
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
						{isHovered === id && (
							<IconButton
								onClick={() => createPage(position + 1)}
							/>
						)}
					</div>
				))}
				<TabCard
					content={'Add page'}
					icon={'add'}
					state={'active'}
					iconColor={'black'}
					action={() => createPage(localPages.length)}
				/>
				<DottedLine />
			</div>
			<ContextMenu
				position={contextMenu}
				onClose={() => setContextMenu(null)}
			/>
		</div>
	);
};

const DottedLine = () => (
	<div className="border-t-2 border-dashed border-[#C0C0C0] absolute w-full top-1/2 transform -translate-y-1/2 z-0" />
);

export { PagesNavigationBar };
