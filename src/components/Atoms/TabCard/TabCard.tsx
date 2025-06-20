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
	state: TabCardStates; // make it a tuple
}

const TabCard = ({ content, icon, state }: TabCardProps) => {
	const isActive = state === 'active';

	return (
		<button
			className={`${tabCardBasic} ${styles[state]}`}
			onClick={() => !isActive && window.alert('page clicked')}
		>
			<TabCardIcons
				colorType={isActive ? 'active' : 'default'}
				type={icon}
			/>
			<Body color={isActive ? 'default' : 'disabled'}>{content}</Body>
			{isActive && (
				<EllipsisVertical
					onClick={(e) => {
						e.stopPropagation();
						window.alert('test');
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
