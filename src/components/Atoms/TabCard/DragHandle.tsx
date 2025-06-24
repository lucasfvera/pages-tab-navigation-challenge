import { GripVertical } from 'lucide-react';

export const DragHandle = () => {
	return (
		<div
			data-testid={'drag-handle-icon'}
			className="bg-white border border-gray-300 rounded-full p-0.5 cursor-grab active:cursor-grabbing rotate-90 w-6 h-6 flex items-center justify-center"
		>
			<GripVertical size={16} className="text-gray-500" />
		</div>
	);
};
