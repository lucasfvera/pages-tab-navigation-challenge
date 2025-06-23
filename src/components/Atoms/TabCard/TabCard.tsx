'use client';

import {
	styles,
	tabCardBasic,
	TabCardStates,
} from '@/components/Atoms/TabCard/TabCard.style';
import {
	TabCardIcons,
	TabCardIconsProps,
} from '@/components/Atoms/TabCard/TabCardIcons';
import { Body } from '@/components/Atoms/Typography';
import { EllipsisVertical } from 'lucide-react';

interface TabCardProps {
	content: string;
	icon: TabCardIconsProps['type'];
	iconColor?: TabCardIconsProps['colorType'];
	state: TabCardStates;
	action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	contextMenuAction?: (
		e: React.MouseEvent<HTMLElement | SVGSVGElement>
	) => void;
}

const TabCard = ({
	content,
	icon,
	state,
	iconColor = 'active',
	action,
	contextMenuAction,
}: TabCardProps) => {
	const isActive = state === 'active';
	const isAddPageTab = icon === 'add';
	const showContextualMenu = isActive && !isAddPageTab;

	return (
		<button
			className={`${tabCardBasic} ${styles[state]} ${
				isAddPageTab && action ? 'cursor-pointer' : ''
			}`}
			onClick={(e) => action && action(e)}
			onContextMenu={contextMenuAction}
		>
			<TabCardIcons colorType={iconColor} type={icon} />
			<Body color={isActive ? 'default' : 'disabled'}>{content}</Body>
			{showContextualMenu && (
				<EllipsisVertical
					onClick={(e) => {
						e.stopPropagation();
						if (contextMenuAction) contextMenuAction(e);
					}}
					size={16}
					color={'var(--color-icon-light-gray)'}
					className={'ml-0.5 cursor-pointer'}
				/>
			)}
		</button>
	);
};

export { TabCard };
