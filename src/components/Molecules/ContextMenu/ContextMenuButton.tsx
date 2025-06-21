import { ReactNode } from 'react';
import { ContextMenuText } from '@/components/Atoms/Typography';

interface ContextMenuButtonProps {
	icon: ReactNode;
	children: string;
	onClick?: () => void;
	destroy?: boolean;
}

const ContextMenuButton = ({
	icon,
	children,
	onClick,
	destroy,
}: ContextMenuButtonProps) => {
	return (
		<button
			className="flex gap-1.5 hover:bg-gray-200 w-full text-left p-1 rounded"
			onClick={onClick}
		>
			{icon}
			<ContextMenuText destroy={destroy}>{children}</ContextMenuText>
		</button>
	);
};

export { ContextMenuButton };
