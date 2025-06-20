import { Info, FileText, CircleCheck, Plus } from 'lucide-react';

export interface TabCardIconsProps {
	colorType: 'active' | 'default' | 'black';
	type: 'info' | 'page' | 'ending' | 'add';
}

export const TabCardIcons = ({ colorType, type }: TabCardIconsProps) => {
	const color =
		colorType === 'active'
			? 'var(--color-icon-orange)'
			: colorType === 'default'
			? 'var(--color-icon-gray)'
			: 'var(--color-text-black)';

	const Icon =
		type === 'info'
			? Info
			: type === 'page'
			? FileText
			: type === 'ending'
			? CircleCheck
			: Plus;
	return <Icon color={color} size={20} />;
};
