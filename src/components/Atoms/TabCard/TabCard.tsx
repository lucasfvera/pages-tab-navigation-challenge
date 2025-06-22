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
	action?: () => void;
	additionalAction?: (
		e: React.MouseEvent<HTMLElement | SVGSVGElement>
	) => void;
}

const TabCard = ({
	content,
	icon,
	state,
	iconColor = 'active',
	action,
	additionalAction,
}: TabCardProps) => {
	const isActive = state === 'active';
	const isAddPageTab = icon === 'add';
	const showContextualMenu = isActive && !isAddPageTab;

	return (
		<button
			className={`${tabCardBasic} ${styles[state]} ${
				isAddPageTab && action ? 'cursor-pointer' : ''
			}`}
			onClick={() => action && action()}
		>
			<TabCardIcons colorType={iconColor} type={icon} />
			<Body color={isActive ? 'default' : 'disabled'}>{content}</Body>
			{showContextualMenu && (
				<EllipsisVertical
					onClick={(e) => {
						e.stopPropagation();
						if (additionalAction) additionalAction(e);
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
