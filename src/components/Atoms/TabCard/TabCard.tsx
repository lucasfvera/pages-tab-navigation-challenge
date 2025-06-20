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
		<div className={`${tabCardBasic} ${styles[state]}`}>
			<TabCardIcons
				colorType={isActive ? 'active' : 'default'}
				type={icon}
			/>
			<Body>{content}</Body>
			{isActive && (
				<EllipsisVertical
					size={16}
					color={'var(--color-icon-light-gray)'}
					className={'ml-0.5'}
				/>
			)}
		</div>
	);
};

export { TabCard };
