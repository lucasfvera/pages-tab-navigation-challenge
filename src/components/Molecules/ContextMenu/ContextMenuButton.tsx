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
	const hoverColor = destroy
		? 'hover:bg-(--color-destroy)/10'
		: 'hover:bg-gray-100';
	return (
		<button
			className={`flex gap-1.5 ${hoverColor} w-full text-left py-1.5 px-2 rounded-sm`}
			onClick={onClick}
		>
			{icon}
			<ContextMenuText destroy={destroy}>{children}</ContextMenuText>
		</button>
	);
};

export { ContextMenuButton };
