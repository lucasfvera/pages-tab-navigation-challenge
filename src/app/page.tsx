import { TabCard } from '@/components/Atoms/TabCard';

export default function Home() {
	return (
		<div>
			Welcome to Fillout{' '}
			<TabCard content="Info" icon={<p>test</p>} state="active" />
		</div>
	);
}
