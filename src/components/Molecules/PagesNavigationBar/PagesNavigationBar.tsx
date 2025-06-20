import { TabCard } from '@/components/Atoms/TabCard/TabCard';
import { TabCardIconsProps } from '@/components/Atoms/TabCard/TabCardIcons';

interface Page {
	id: string; // This should be an UUID from the backend
	title: string;
	type: TabCardIconsProps['type'];
}

const MOCKED_PAGES: Page[] = [
	{
		id: '1',
		title: 'Active',
		type: 'info',
	},
	{
		id: '2',
		title: 'Default',
		type: 'page',
	},
	{
		id: '3',
		title: 'Info',
		type: 'ending',
	},
];

const PagesNavigationBar = () => {
	return (
		<div className="flex w-fit gap-5 relative items-center py-6">
			{MOCKED_PAGES.map(({ title, id, type }) => (
				<TabCard
					key={id}
					content={title}
					icon={type}
					iconColor={title === 'Active' ? 'active' : 'default'}
					state={title === 'Active' ? 'active' : 'default'}
				/>
			))}
			<TabCard
				content={'Add page'}
				icon={'add'}
				state={'active'}
				iconColor={'black'}
			/>
			<DottedLine />
		</div>
	);
};

const DottedLine = () => {
	return (
		<div className="border-t-2 border-dashed border-[#C0C0C0] absolute w-full top-1/2 transform -translate-y-1/2 z-0" />
	);
};

export { PagesNavigationBar };
