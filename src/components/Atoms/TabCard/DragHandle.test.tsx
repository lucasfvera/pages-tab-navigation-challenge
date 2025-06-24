import { render, screen } from '@testing-library/react';
import { DragHandle } from './DragHandle';

// Mock lucide-react GripVertical icon
jest.mock('lucide-react', () => ({
	GripVertical: ({
		size,
		className,
	}: {
		size: number;
		className: string;
	}) => (
		<div
			data-testid="grip-vertical-icon"
			data-size={size}
			data-classname={className}
		>
			GripVertical
		</div>
	),
}));

describe('DragHandle', () => {
	it('should render the icon container with correct styling classes', () => {
		// Arrange & Act
		render(<DragHandle />);

		// Assert
		const dragHandle = screen.getByTestId('drag-handle-icon');
		expect(dragHandle).toBeInTheDocument();
		expect(dragHandle).toHaveClass(
			'bg-white',
			'border',
			'border-gray-300',
			'rounded-full',
			'p-0.5',
			'cursor-grab',
			'active:cursor-grabbing',
			'rotate-90',
			'w-6',
			'h-6',
			'flex',
			'items-center',
			'justify-center'
		);
	});

	it('should render GripVertical icon with correct props', () => {
		// Arrange & Act
		render(<DragHandle />);

		// Assert
		const icon = screen.getByTestId('grip-vertical-icon');
		expect(icon).toBeInTheDocument();
		expect(icon).toHaveAttribute('data-size', '16');
		expect(icon).toHaveAttribute('data-classname', 'text-gray-500');
	});

	it('should have correct dimensions', () => {
		// Arrange & Act
		render(<DragHandle />);

		// Assert
		const dragHandle = screen.getByTestId('drag-handle-icon');
		expect(dragHandle).toHaveClass('w-6', 'h-6');
	});

	it('should have correct cursor behavior', () => {
		// Arrange & Act
		render(<DragHandle />);

		// Assert
		const dragHandle = screen.getByTestId('drag-handle-icon');
		expect(dragHandle).toHaveClass('cursor-grab', 'active:cursor-grabbing');
	});

	it('should be positioned correctly with flex layout', () => {
		// Arrange & Act
		render(<DragHandle />);

		// Assert
		const dragHandle = screen.getByTestId('drag-handle-icon');
		expect(dragHandle).toHaveClass(
			'flex',
			'items-center',
			'justify-center'
		);
	});
});
