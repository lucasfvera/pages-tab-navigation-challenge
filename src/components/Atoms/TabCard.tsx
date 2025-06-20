import { styles, TabCardStates } from '@/components/Atoms/TabCard.style';
import { Body } from '@/components/Atoms/Typography';

interface TabCardProps {
	content: string;
	icon: React.ReactNode;
	state: TabCardStates; // make it a tuple
}

const TabCard = ({ content, icon, state }: TabCardProps) => {
	const isActive = state === 'active';

	return (
		<div className={`flex ${styles[state]}`}>
			<span>{icon}</span>
			<Body>{content}</Body>
			{isActive && 'dots'}
		</div>
	);
};

export { TabCard };
