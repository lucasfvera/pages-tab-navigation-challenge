import { useRef, useEffect, useState } from 'react';
import { Flag, PenLine, Clipboard, Copy, Trash2 } from 'lucide-react';
import { Body } from '@/components/Atoms/Typography';
import { ContextMenuButton } from '@/components/Molecules/ContextMenu/ContextMenuButton';

interface ContextMenuPosition {
	x: number;
	y: number;
}

interface ContextMenuProps {
	position: ContextMenuPosition | null;
	onClose: () => void;
}

const ContextMenu = ({ position, onClose }: ContextMenuProps) => {
	const contextMenuRef = useRef<HTMLDialogElement | null>(null);
	const [calculatedPosition, setCalculatedPosition] =
		useState<ContextMenuPosition | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [onClose]);

	// Calculate context menu height and position after render
	useEffect(() => {
		if (position && contextMenuRef.current) {
			const height = contextMenuRef.current.clientHeight;

			setCalculatedPosition({
				x: position.x,
				y: position.y - height,
			});
		}
	}, [position]);

	// if (!position) return null;

	// Use calculated position if available, otherwise use original position (will be adjusted after render)
	const displayPosition = calculatedPosition || position;

	return (
		<dialog
			open={!!position}
			ref={contextMenuRef}
			style={{
				top: displayPosition?.y,
				left: displayPosition?.x,
				visibility: calculatedPosition ? 'visible' : 'hidden',
			}}
			className="bg-white border border-(--color-border-gray) shadow-md/4 rounded-2xl z-50 fixed min-w-[240px]"
			aria-labelledby="contextmenu-header"
		>
			<div
				id="contextmenu-header"
				className="h-[40px] flex flex-col justify-center py-2 px-3 bg-(--color-bg-light-gray2) rounded-2xl"
			>
				<Body color="default">Settings</Body>
			</div>
			<div className="border-t border-(--color-border-gray)" />
			<ul className="flex flex-col justify-start p-1">
				<ContextMenuButton
					icon={
						<Flag
							color="var(--color-border-blue)"
							fill="var(--color-border-blue)"
							size={16}
						/>
					}
				>
					Set as first page
				</ContextMenuButton>
				<ContextMenuButton
					icon={
						<PenLine
							color="var(--color-icon-light-gray)"
							size={16}
						/>
					}
				>
					Rename
				</ContextMenuButton>
				<ContextMenuButton
					icon={
						<Clipboard
							color="var(--color-icon-light-gray)"
							size={16}
						/>
					}
				>
					Copy
				</ContextMenuButton>
				<ContextMenuButton
					icon={
						<Copy color="var(--color-icon-light-gray)" size={16} />
					}
				>
					Duplicate
				</ContextMenuButton>
				<div className="border-t border-(--color-border-gray) my-1" />
				<ContextMenuButton
					icon={<Trash2 color="var(--color-destroy)" size={16} />}
					destroy
				>
					Delete
				</ContextMenuButton>
			</ul>
		</dialog>
	);
};

export { ContextMenu };
