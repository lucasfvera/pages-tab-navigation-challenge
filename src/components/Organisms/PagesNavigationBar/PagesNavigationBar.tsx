'use client';

import { useState } from 'react';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { ContextMenuPosition } from '@/components/Organisms/PagesNavigationBar/PagesNavigationBar.types';
import { usePathname } from 'next/navigation';
import { ContextMenu } from '@/components/Molecules/ContextMenu/ContextMenu';
import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DottedLine } from '@/components/Organisms/PagesNavigationBar/DottedLine';
import { DraggableTabCard } from '@/components/Organisms/PagesNavigationBar/DragAndDrop/TabCardDraggable';
import { useLocalPagesContext } from '@/contexts/LocalPagesContext/hooks/useLocalPagesContext';
import { NavigationDndContext } from '@/components/Organisms/PagesNavigationBar/DragAndDrop/NavigationDndContext';

const PagesNavigationBar = () => {
	const { localPages, createPage } = useLocalPagesContext();

	const { setNodeRef } = useDroppable({
		id: 'droppable',
	});
	const pathname = usePathname();
	const [hoveredElementId, setHoveredElementId] = useState<string | null>(
		null
	);
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
		<div className="relative overflow-x-auto w-full no-scrollbar pt-3">
			<NavigationDndContext>
				<div
					className="flex w-max gap-5 relative items-center"
					ref={setNodeRef}
					onMouseLeave={() => {
						const hoverTimer = setTimeout(
							() => setHoveredElementId(null),
							400
						);
						setTimer(hoverTimer);
					}}
				>
					<SortableContext
						items={localPages.map((page) => page.id)}
						strategy={horizontalListSortingStrategy}
					>
						{localPages.map((page) => (
							<DraggableTabCard
								key={page.id}
								page={page}
								hoveredElementId={hoveredElementId}
								setHoveredElementId={setHoveredElementId}
								createPage={createPage}
								contextMenuHandler={contextMenuHandler}
								pathname={pathname}
								timer={timer}
							/>
						))}
					</SortableContext>
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
			</NavigationDndContext>
		</div>
	);
};

export { PagesNavigationBar };
