import { TabCardIconsProps } from '@/components/Atoms/TabCard/TabCardIcons';

export interface Page {
	id: string; // This should be an UUID from the backend
	position: number;
	title: string;
	type: TabCardIconsProps['type'];
}

export interface PagesNavigationBarProps {
	pages: Page[];
}
