import { useRef, useEffect } from 'react';
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
	const contextMenuRef = useRef<HTMLDivElement | null>(null);

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

	if (!position) return null;

	return (
		<div
			ref={contextMenuRef}
			style={{
				top: position.y - 258,
				left: position.x,
			}}
			className="bg-white border border-(--color-border-gray) shadow-md/4 rounded-2xl z-50 fixed min-w-[240px]"
		>
			<div className="h-[40px] flex flex-col justify-center py-2 px-3 bg-(--color-bg-light-gray2) rounded-2xl">
				<Body color="default">Settings</Body>
			</div>
			<div className="border-t border-(--color-border-gray)" />
			<ul className="flex flex-col gap-3.5 p-3 justify-start">
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
				<div className="border-t border-(--color-border-gray)" />
				<ContextMenuButton
					icon={<Trash2 color="var(--color-destroy)" size={16} />}
					destroy
				>
					Delete
				</ContextMenuButton>
			</ul>
		</div>
	);
};

export { ContextMenu };
