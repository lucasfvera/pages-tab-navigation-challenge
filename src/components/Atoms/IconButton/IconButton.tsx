import { Plus } from 'lucide-react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

// If needed we can extend this component and allow any icon or a set of icons
const IconButton = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => {
	return (
		<button
			{...props}
			className="h-fit rounded-full bg-white border-(--color-border-gray) border-1 shadow-sm/4 cursor-pointer"
		>
			<Plus size={14} />
		</button>
	);
};

export { IconButton };
