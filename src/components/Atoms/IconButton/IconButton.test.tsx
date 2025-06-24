import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton', () => {
	// Arrange
	const defaultProps = {
		onClick: jest.fn(),
		'aria-label': 'Add button',
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render a button with Plus icon', () => {
		// Arrange
		render(<IconButton {...defaultProps} />);

		// Act
		const button = screen.getByRole('button', { name: /add button/i });

		// Assert
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			'h-fit',
			'rounded-full',
			'bg-white',
			'border-(--color-border-gray)',
			'border-1',
			'shadow-sm/4',
			'cursor-pointer'
		);
	});

	it('should call the proper action when clicked', async () => {
		// Arrange
		const user = userEvent.setup();
		const mockOnClick = jest.fn();
		render(<IconButton {...defaultProps} onClick={mockOnClick} />);

		// Act
		const button = screen.getByRole('button', { name: /add button/i });
		await user.click(button);

		// Assert
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should pass through additional props to the button element', () => {
		// Arrange
		const customProps = {
			...defaultProps,
			disabled: true,
			'data-testid': 'custom-icon-button',
		};

		// Act
		render(<IconButton {...customProps} />);

		// Assert
		const button = screen.getByTestId('custom-icon-button');
		expect(button).toBeDisabled();
	});

	it('should render with correct accessibility attributes', () => {
		// Arrange
		render(<IconButton {...defaultProps} />);

		// Act
		const button = screen.getByRole('button');

		// Assert
		expect(button).toHaveAttribute('aria-label', 'Add button');
	});

	it('should handle keyboard interactions', async () => {
		// Arrange
		const user = userEvent.setup();
		const mockOnClick = jest.fn();
		render(<IconButton {...defaultProps} onClick={mockOnClick} />);

		// Act
		const button = screen.getByRole('button', { name: /add button/i });
		button.focus();
		await user.keyboard('{Enter}');

		// Assert
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
