'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IconButton } from '@/components/Atoms/IconButton/IconButton';
import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { PagesNavigationBarProps } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar.types';
import { usePathname } from 'next/navigation';
import { Body, ContextMenuText } from '@/components/Atoms/Typography';
import { Clipboard, Copy, Flag, PenLine, Trash2 } from 'lucide-react';

interface ContextMenuPosition {
	x: number;
	y: number;
}

const PagesNavigationBar = ({ pages }: PagesNavigationBarProps) => {
	const pathname = usePathname();
	const [isHovered, setIsHovered] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(
		null
	);
	const contextMenuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(event.target as Node)
			) {
				setContextMenu(null);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

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
						<Link
							href={id}
							onContextMenu={(e) => {
								e.preventDefault();
								const rectangle =
									e.currentTarget.getBoundingClientRect();
								console.log(rectangle);
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
			{contextMenu && (
				<div
					ref={contextMenuRef}
					style={{
						top: contextMenu.y - 218,
						left: contextMenu.x,
					}}
					className="bg-white border border-(--color-border-gray) shadow-md/4 rounded-2xl z-50 fixed min-w-[240px]"
				>
					<div className="h-[40px] flex flex-col justify-center py-2 px-3 bg-(--color-bg-light-gray2) rounded-2xl">
						<Body color="default">Settings</Body>
					</div>
					<div className="border-t border-(--color-border-gray)" />
					<ul className="flex flex-col gap-3.5 p-3 justify-start">
						<button className="flex gap-1.5 hover:bg-gray-200">
							<Flag
								color="var(--color-border-blue)"
								fill="var(--color-border-blue)"
								size={16}
							/>
							<ContextMenuText>Set as first page</ContextMenuText>
						</button>
						<button className="flex gap-1.5 hover:bg-gray-200">
							<PenLine
								color="var(--color-icon-light-gray)"
								size={16}
							/>
							<ContextMenuText>Rename</ContextMenuText>
						</button>
						<button className="flex gap-1.5 hover:bg-gray-200">
							<Clipboard
								color="var(--color-icon-light-gray)"
								size={16}
							/>
							<ContextMenuText>Copy</ContextMenuText>
						</button>
						<button className="flex gap-1.5 hover:bg-gray-200">
							<Copy
								color="var(--color-icon-light-gray)"
								size={16}
							/>
							<ContextMenuText>Duplicate</ContextMenuText>
						</button>
						<div className="border-t border-(--color-border-gray)" />
						<button className="flex gap-1.5 hover:bg-gray-200">
							<Trash2 color="var(--color-destroy)" size={16} />
							<ContextMenuText destroy>Duplicate</ContextMenuText>
						</button>
					</ul>
				</div>
			)}
		</div>
	);
};

const DottedLine = () => (
	<div className="border-t-2 border-dashed border-[#C0C0C0] absolute w-full top-1/2 transform -translate-y-1/2 z-0" />
);

export { PagesNavigationBar };
