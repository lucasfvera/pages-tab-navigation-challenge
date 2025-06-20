import { TabCard } from '@/components/Atoms/TabCard/TabCard';

export default function Home() {
	return (
		<div>
			Welcome to Fillout{' '}
			<TabCard content="Active" icon={'info'} state="active" />
			<TabCard content="Default" icon={'page'} state="default" />
		</div>
	);
}
