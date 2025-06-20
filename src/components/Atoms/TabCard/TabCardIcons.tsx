import { Info, FileText, CircleCheck } from 'lucide-react';

export interface TabCardIconsProps {
	colorType: 'active' | 'default';
	type: 'info' | 'page' | 'ending';
}

export const TabCardIcons = ({ colorType, type }: TabCardIconsProps) => {
	const color =
		colorType === 'active'
			? 'var(--color-icon-orange)'
			: 'var(--color-icon-gray)';

	const Icon =
		type === 'info' ? Info : type === 'page' ? FileText : CircleCheck;
	return <Icon color={color} size={20} />;
};
