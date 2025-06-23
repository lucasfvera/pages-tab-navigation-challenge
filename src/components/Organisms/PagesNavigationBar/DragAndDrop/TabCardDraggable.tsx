'use client';

import { IconButton } from '@/components/Atoms/IconButton/IconButton';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { Page } from '@/components/Organisms/PagesNavigationBar/PagesNavigationBar.types';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { useRouter } from 'next/navigation';
import { DragHandle } from '@/components/Atoms/TabCard/DragHandle';

interface DraggableTabCardProps {
	page: Page;
	isHovered: string | null;
	setIsHovered: (id: string | null) => void;
	createPage: (position: number) => void;
	contextMenuHandler: (
		e: React.MouseEvent<HTMLElement | SVGSVGElement>
	) => void;
	pathname: string;
	timer: NodeJS.Timeout | null;
}

export const DraggableTabCard = ({
	page,
	isHovered,
	setIsHovered,
	createPage,
	contextMenuHandler,
	pathname,
	timer,
}: DraggableTabCardProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: page.id });
	const { active } = useDroppable({
		id: 'droppable',
	});
	const router = useRouter();

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				transition,
		  }
		: undefined;

	const showPlusIcon = isHovered === page.id && !isDragging && !active;
	const showDragHandle = isHovered === page.id || isDragging;

	return (
		<div
			ref={setNodeRef}
			style={style}
			onMouseEnter={() => {
				if (timer) {
					clearTimeout(timer);
				}
				setIsHovered(page.id);
			}}
			className="flex z-10 items-center gap-5"
		>
			{showPlusIcon && (
				<IconButton onClick={() => createPage(page.position)} />
			)}
			<div className="relative">
				{showDragHandle && (
					<div
						className="absolute top-0 left-1/2 -translate-1/2 z-20"
						{...listeners}
						{...attributes}
					>
						<DragHandle />
					</div>
				)}
				<TabCard
					content={page.title}
					icon={page.type}
					iconColor={
						pathname === `/${page.id}` ? 'active' : 'default'
					}
					state={pathname === `/${page.id}` ? 'active' : 'default'}
					contextMenuAction={(e) => {
						e.stopPropagation();
						contextMenuHandler(e);
					}}
					action={() => {
						router.push(page.id);
					}}
				/>
			</div>
			{showPlusIcon && (
				<IconButton onClick={() => createPage(page.position + 1)} />
			)}
		</div>
	);
};
