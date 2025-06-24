import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextMenuButton } from './ContextMenuButton';

// Mock ContextMenuText
jest.mock('@/components/Atoms/Typography', () => ({
	ContextMenuText: ({
		children,
		destroy,
	}: {
		children: string;
		destroy?: boolean;
	}) => (
		<span
			data-testid="context-menu-text"
			data-destroy={destroy ? 'true' : 'false'}
		>
			{children}
		</span>
	),
}));

describe('ContextMenuButton', () => {
	it('renders children and icon', () => {
		// Arrange
		const mockIcon = <span data-testid="test-icon">icon</span>;
		const mockText = 'Menu Item';

		// Act
		render(
			<ContextMenuButton icon={mockIcon}>{mockText}</ContextMenuButton>
		);

		// Assert
		const icon = screen.getByTestId('test-icon');
		const text = screen.getByTestId('context-menu-text');
		expect(icon).toBeInTheDocument();
		expect(text).toHaveTextContent(mockText);
	});

	it('applies destroy styling properly', () => {
		// Arrange
		const mockIcon = <span data-testid="test-icon">icon</span>;
		const mockText = 'Delete';

		// Act
		render(
			<ContextMenuButton icon={mockIcon} destroy>
				{mockText}
			</ContextMenuButton>
		);

		// Assert
		const button = screen.getByRole('button');
		const text = screen.getByTestId('context-menu-text');
		expect(button).toHaveClass('hover:bg-(--color-destroy)/10');
		expect(text).toHaveAttribute('data-destroy', 'true');
	});

	it('applies normal styling when destroy is false/undefined', () => {
		// Arrange
		const mockIcon = <span data-testid="test-icon">icon</span>;
		const mockText = 'Normal';

		// Act
		render(
			<ContextMenuButton icon={mockIcon}>{mockText}</ContextMenuButton>
		);

		// Assert
		const button = screen.getByRole('button');
		const text = screen.getByTestId('context-menu-text');
		expect(button).toHaveClass('hover:bg-gray-100');
		expect(text).toHaveAttribute('data-destroy', 'false');
	});

	it('calls the proper action when clicked', async () => {
		// Arrange
		const user = userEvent.setup();
		const handleClick = jest.fn();
		render(
			<ContextMenuButton icon={<span />} onClick={handleClick}>
				Clickable
			</ContextMenuButton>
		);

		// Act
		const button = screen.getByRole('button');
		await user.click(button);

		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
