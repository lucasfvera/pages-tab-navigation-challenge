import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabCard } from './TabCard';

// Mock dependencies
jest.mock('@/components/Atoms/TabCard/TabCard.style', () => ({
	styles: {
		active: 'active-styles',
		default: 'default-styles',
	},
	tabCardBasic: 'tab-card-basic',
	TabCardStates: {
		active: 'active',
		default: 'default',
	},
}));

jest.mock('@/components/Atoms/TabCard/TabCardIcons', () => ({
	TabCardIcons: ({
		type,
		colorType,
	}: {
		type: string;
		colorType: string;
	}) => (
		<div
			data-testid="tab-card-icon"
			data-type={type}
			data-color-type={colorType}
		>
			TabCardIcon
		</div>
	),
}));

jest.mock('@/components/Atoms/Typography', () => ({
	Body: ({ children, color }: { children: string; color: string }) => (
		<span data-testid="body-text" data-color={color}>
			{children}
		</span>
	),
}));

jest.mock('lucide-react', () => ({
	EllipsisVertical: ({
		onClick,
		size,
		color,
		className,
	}: {
		onClick?: (e: React.MouseEvent) => void;
		size: number;
		color: string;
		className: string;
	}) => (
		<div
			data-testid="ellipsis-vertical"
			data-size={size}
			data-color={color}
			data-classname={className}
			onClick={onClick}
		>
			EllipsisVertical
		</div>
	),
}));

describe('TabCard', () => {
	const defaultProps = {
		content: 'Test Tab',
		icon: 'page' as const,
		state: 'active' as const,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Rendering', () => {
		it('should render with correct content and icon', () => {
			// Arrange
			const props = { ...defaultProps };

			// Act
			render(<TabCard {...props} />);

			// Assert
			const text = screen.getByText('Test Tab');
			const icon = screen.getByTestId('tab-card-icon');
			expect(text).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute('data-type', 'page');
		});

		it('should render with correct state styling', () => {
			// Arrange
			const props = { ...defaultProps, state: 'default' as const };

			// Act
			render(<TabCard {...props} />);

			// Assert
			const button = screen.getByRole('button');
			expect(button).toHaveClass('tab-card-basic', 'default-styles');
		});

		it('should render Body component with correct color for active state', () => {
			// Arrange
			const props = { ...defaultProps, state: 'active' as const };

			// Act
			render(<TabCard {...props} />);

			// Assert
			const bodyText = screen.getByTestId('body-text');
			expect(bodyText).toHaveAttribute('data-color', 'default');
		});

		it('should render Body component with correct color for default state', () => {
			// Arrange
			const props = { ...defaultProps, state: 'default' as const };

			// Act
			render(<TabCard {...props} />);

			// Assert
			const bodyText = screen.getByTestId('body-text');
			expect(bodyText).toHaveAttribute('data-color', 'disabled');
		});
	});

	describe('Context Menu', () => {
		it('should show context menu for active non-add tabs', () => {
			// Arrange
			const props = {
				...defaultProps,
				state: 'active' as const,
				icon: 'page' as const,
			};

			// Act
			render(<TabCard {...props} />);

			// Assert
			expect(screen.getByTestId('ellipsis-vertical')).toBeInTheDocument();
		});

		it('should not show context menu for default tabs', () => {
			// Arrange
			const props = { ...defaultProps, state: 'default' as const };

			// Act
			render(<TabCard {...props} />);

			// Assert
			expect(
				screen.queryByTestId('ellipsis-vertical')
			).not.toBeInTheDocument();
		});

		it('should not show context menu for add tabs', () => {
			// Arrange
			const props = {
				...defaultProps,
				state: 'active' as const,
				icon: 'add' as const,
			};

			// Act
			render(<TabCard {...props} />);

			// Assert
			expect(
				screen.queryByTestId('ellipsis-vertical')
			).not.toBeInTheDocument();
		});

		it('should call contextMenuAction when ellipsis is clicked', async () => {
			// Arrange
			const user = userEvent.setup();
			const mockContextMenuAction = jest.fn();
			const props = {
				...defaultProps,
				state: 'active' as const,
				contextMenuAction: mockContextMenuAction,
			};

			// Act
			render(<TabCard {...props} />);
			const ellipsis = screen.getByTestId('ellipsis-vertical');
			await user.click(ellipsis);

			// Assert
			expect(mockContextMenuAction).toHaveBeenCalledTimes(1);
		});
	});

	describe('Click Handling', () => {
		it('should call action when button is clicked', async () => {
			// Arrange
			const user = userEvent.setup();
			const mockAction = jest.fn();
			const props = { ...defaultProps, action: mockAction };

			// Act
			render(<TabCard {...props} />);
			const button = screen.getByRole('button');
			await user.click(button);

			// Assert
			expect(mockAction).toHaveBeenCalledTimes(1);
		});

		it('should not call action when no action is provided', async () => {
			// Arrange
			const user = userEvent.setup();
			const props = { ...defaultProps };

			// Act
			render(<TabCard {...props} />);
			const button = screen.getByRole('button');
			await user.click(button);

			// Assert
			// No error should be thrown and no action should be called
			expect(button).toBeInTheDocument();
		});

		it('should call contextMenuAction on right click', async () => {
			// Arrange
			const user = userEvent.setup();
			const mockContextMenuAction = jest.fn();
			const props = {
				...defaultProps,
				contextMenuAction: mockContextMenuAction,
			};

			// Act
			render(<TabCard {...props} />);
			const button = screen.getByRole('button');
			await user.pointer({ target: button, keys: '[MouseRight]' });

			// Assert
			expect(mockContextMenuAction).toHaveBeenCalledTimes(1);
		});
	});

	describe('Add Page Tab', () => {
		it('should have cursor-pointer class for add tabs with action', () => {
			// Arrange
			const mockAction = jest.fn();
			const props = {
				...defaultProps,
				icon: 'add' as const,
				action: mockAction,
			};

			// Act
			render(<TabCard {...props} />);

			// Assert
			const button = screen.getByRole('button');
			expect(button).toHaveClass('cursor-pointer');
		});

		it('should not have cursor-pointer class for add tabs without action', () => {
			// Arrange
			const props = {
				...defaultProps,
				icon: 'add' as const,
			};

			// Act
			render(<TabCard {...props} />);

			// Assert
			const button = screen.getByRole('button');
			expect(button).not.toHaveClass('cursor-pointer');
		});
	});

	describe('Icon Color', () => {
		it('should pass default iconColor when not provided', () => {
			// Arrange
			const props = { ...defaultProps };

			// Act
			render(<TabCard {...props} />);

			// Assert
			const icon = screen.getByTestId('tab-card-icon');
			expect(icon).toHaveAttribute('data-color-type', 'active');
		});

		it('should pass custom iconColor when provided', () => {
			// Arrange
			const props = { ...defaultProps, iconColor: 'black' as const };

			// Act
			render(<TabCard {...props} />);

			// Assert
			const icon = screen.getByTestId('tab-card-icon');
			expect(icon).toHaveAttribute('data-color-type', 'black');
		});
	});
});
