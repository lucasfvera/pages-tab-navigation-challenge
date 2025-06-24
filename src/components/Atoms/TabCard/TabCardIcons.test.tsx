import { render, screen } from '@testing-library/react';
import { TabCardIcons } from './TabCardIcons';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
	Info: ({ color, size }: { color: string; size: number }) => (
		<div data-testid="info-icon" data-color={color} data-size={size}>
			Info
		</div>
	),
	FileText: ({ color, size }: { color: string; size: number }) => (
		<div data-testid="filetext-icon" data-color={color} data-size={size}>
			FileText
		</div>
	),
	CircleCheck: ({ color, size }: { color: string; size: number }) => (
		<div data-testid="circlecheck-icon" data-color={color} data-size={size}>
			CircleCheck
		</div>
	),
	Plus: ({ color, size }: { color: string; size: number }) => (
		<div data-testid="plus-icon" data-color={color} data-size={size}>
			Plus
		</div>
	),
}));

describe('TabCardIcons', () => {
	describe('Icon types', () => {
		it('should render Info icon when type is info', () => {
			// Arrange
			const props = {
				colorType: 'active' as const,
				type: 'info' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('info-icon');
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('data-size', '20');
		});

		it('should render FileText icon when type is page', () => {
			// Arrange
			const props = {
				colorType: 'default' as const,
				type: 'page' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('filetext-icon');
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('data-size', '20');
		});

		it('should render CircleCheck icon when type is ending', () => {
			// Arrange
			const props = {
				colorType: 'black' as const,
				type: 'ending' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('circlecheck-icon');
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('data-size', '20');
		});

		it('should render Plus icon when type is add', () => {
			// Arrange
			const props = {
				colorType: 'active' as const,
				type: 'add' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('plus-icon');
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('data-size', '20');
		});
	});

	describe('Color types', () => {
		it('should apply active color when colorType is active', () => {
			// Arrange
			const props = {
				colorType: 'active' as const,
				type: 'info' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('info-icon');
			expect(icon).toHaveAttribute(
				'data-color',
				'var(--color-icon-orange)'
			);
		});

		it('should apply default color when colorType is default', () => {
			// Arrange
			const props = {
				colorType: 'default' as const,
				type: 'info' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('info-icon');
			expect(icon).toHaveAttribute(
				'data-color',
				'var(--color-icon-gray)'
			);
		});

		it('should apply black color when colorType is black', () => {
			// Arrange
			const props = {
				colorType: 'black' as const,
				type: 'info' as const,
			};

			// Act
			render(<TabCardIcons {...props} />);

			// Assert
			const icon = screen.getByTestId('info-icon');
			expect(icon).toHaveAttribute(
				'data-color',
				'var(--color-text-black)'
			);
		});
	});
});
