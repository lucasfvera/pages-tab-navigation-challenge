import { render, screen } from '@testing-library/react';
import { Body, ContextMenuText } from './Typography';

describe('Typography Components', () => {
	describe('Body', () => {
		it('should render the provided children text', () => {
			// Arrange
			const testText = 'Custom body content';

			// Act
			render(<Body color="default">{testText}</Body>);

			// Assert
			const text = screen.getByText(testText);
			expect(text).toBeInTheDocument();
		});
		it('should render with default styles', () => {
			// Arrange
			const testText = 'Test default body text';

			// Act
			render(<Body color="default">{testText}</Body>);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass(
				'text-sm/[24px]',
				'font-medium',
				'text-nowrap'
			);
		});

		it('should render with proper color when default', () => {
			// Arrange
			const testText = 'Test body text';

			// Act
			render(<Body color="default">{testText}</Body>);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass('text-(--color-text-black)');
		});

		it('should render with proper color when disabled', () => {
			// Arrange
			const testText = 'Disabled body text';

			// Act
			render(<Body color="disabled">{testText}</Body>);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass('text-(--color-text-gray)');
		});
	});

	describe('ContextMenuText', () => {
		it('should render the provided children text', () => {
			// Arrange
			const testText = 'Custom context menu content';

			// Act
			render(<ContextMenuText>{testText}</ContextMenuText>);

			// Assert
			const text = screen.getByText(testText);
			expect(text).toBeInTheDocument();
		});
		it('should render with common default styles', () => {
			// Arrange
			const testText = 'Context menu text';

			// Act
			render(<ContextMenuText>{testText}</ContextMenuText>);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass(
				'text-sm/[16px]',
				'font-medium',
				'text-nowrap'
			);
		});
		it('should render with proper color by default', () => {
			// Arrange
			const testText = 'Default context menu text';

			// Act
			render(<ContextMenuText>{testText}</ContextMenuText>);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass('text-(--color-text-black)');
		});
		it('should render with proper color by default when is not a destroy text', () => {
			// Arrange
			const testText = 'Context menu text';

			// Act
			render(
				<ContextMenuText destroy={false}>{testText}</ContextMenuText>
			);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass('text-(--color-text-black)');
		});

		it('should render with proper destroy styling', () => {
			// Arrange
			const testText = 'Destroy context menu text';

			// Act
			render(
				<ContextMenuText destroy={true}>{testText}</ContextMenuText>
			);

			// Assert
			const element = screen.getByText(testText);
			expect(element).toBeInTheDocument();
			expect(element).toHaveClass('text-(--color-destroy)');
		});
	});
});
