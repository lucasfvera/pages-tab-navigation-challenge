import { TabCard } from '@/components/Atoms/TabCard/TabCard';

export default function Home() {
	return (
		<div>
			Welcome to Fillout{' '}
			<TabCard content="Info" icon={'info'} state="active" />
		</div>
	);
}
