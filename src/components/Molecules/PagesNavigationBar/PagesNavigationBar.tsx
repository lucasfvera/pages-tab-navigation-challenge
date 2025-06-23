'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconButton } from '@/components/Atoms/IconButton/IconButton';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { ContextMenuPosition } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar.types';
import { usePathname } from 'next/navigation';
import { ContextMenu } from '@/components/Molecules/ContextMenu/ContextMenu';
import { DottedLine } from '@/components/Molecules/PagesNavigationBar/DottedLine';
import { useLocalPagesContext } from '@/contexts/LocalPagesContext/hooks/useLocalPagesContext';

const PagesNavigationBar = () => {
	const { localPages, setLocalPages, createPage } = useLocalPagesContext();

	const pathname = usePathname();
	const [isHovered, setIsHovered] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
		null
	);

	const contextMenuHandler = (
		e: React.MouseEvent<HTMLElement | SVGSVGElement>
	) => {
		e.preventDefault();
		// Find the TabCard element (button) that contains the clicked element
		const tabCardElement = (e.currentTarget as Element).closest('button');
		const rectangle =
			tabCardElement?.getBoundingClientRect() ||
			e.currentTarget.getBoundingClientRect();
		setContextMenu({
			x: rectangle.x,
			y: rectangle.y,
		});
	};

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
						<Link href={id} onContextMenu={contextMenuHandler}>
							<TabCard
								content={title}
								icon={type}
								iconColor={
									pathname === `/${id}` ? 'active' : 'default'
								}
								state={
									pathname === `/${id}` ? 'active' : 'default'
								}
								additionalAction={(e) => {
									e.stopPropagation();
									contextMenuHandler(e);
								}}
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

export { PagesNavigationBar };
