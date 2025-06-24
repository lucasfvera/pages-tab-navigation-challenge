import { render, screen, fireEvent } from '@testing-library/react';
import { ContextMenu } from './ContextMenu';

// Mock icons
jest.mock('lucide-react', () => ({
	Flag: (props: Record<string, unknown>) => (
		<div data-testid="flag-icon" {...props}>
			FlagMockIcon
		</div>
	),
	PenLine: (props: Record<string, unknown>) => (
		<div data-testid="penline-icon" {...props}>
			PenLineMockIcon
		</div>
	),
	Clipboard: (props: Record<string, unknown>) => (
		<div data-testid="clipboard-icon" {...props}>
			ClipboardMockIcon
		</div>
	),
	Copy: (props: Record<string, unknown>) => (
		<div data-testid="copy-icon" {...props}>
			CopyMockIcon
		</div>
	),
	Trash2: (props: Record<string, unknown>) => (
		<div data-testid="trash2-icon" {...props}>
			Trash2MockIcon
		</div>
	),
}));

// Mock ContextMenuButton to inspect props
jest.mock('./ContextMenuButton', () => ({
	ContextMenuButton: ({
		icon,
		children,
		destroy,
	}: {
		icon: React.ReactNode;
		children: React.ReactNode;
		destroy?: boolean;
	}) => (
		<div data-testid={`context-menu-btn${destroy ? '-destroy' : ''}`}>
			{icon}
			{children}
		</div>
	),
}));

describe('ContextMenu', () => {
	const basePosition = { x: 100, y: 200 };
	const onClose = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders nothing if there is no position defined', () => {
		// Act
		render(<ContextMenu position={null} onClose={onClose} />);

		// Assert
		const menu = screen.getByRole('dialog', {
			hidden: true,
		});
		expect(menu).not.toBeVisible();
	});

	it('renders at the correct position when providing one (style)', () => {
		// Act
		render(<ContextMenu position={basePosition} onClose={onClose} />);

		// Assert
		const menu =
			screen.getByRole('dialog', { hidden: true }) ||
			document.querySelector('div[style]');
		expect(menu).toHaveStyle({ left: `${basePosition.x}px` });
	});

	it('calls onClose when clicking outside', () => {
		// Arrange
		render(<ContextMenu position={basePosition} onClose={onClose} />);
		// Act
		fireEvent.click(document);
		// Assert
		expect(onClose).toHaveBeenCalled();
	});

	it('renders all menu items with correct icons and text', () => {
		// Act
		render(<ContextMenu position={basePosition} onClose={onClose} />);
		// Assert
		const setFirst = screen.getByText('Set as first page');
		const rename = screen.getByText('Rename');
		const copy = screen.getByText('Copy');
		const duplicate = screen.getByText('Duplicate');
		const del = screen.getByText('Delete');
		const flagIcon = screen.getByText('FlagMockIcon');
		const penlineIcon = screen.getByText('PenLineMockIcon');
		const clipboardIcon = screen.getByText('ClipboardMockIcon');
		const copyIcon = screen.getByText('CopyMockIcon');
		const trash2Icon = screen.getByText('Trash2MockIcon');
		expect(setFirst).toBeInTheDocument();
		expect(rename).toBeInTheDocument();
		expect(copy).toBeInTheDocument();
		expect(duplicate).toBeInTheDocument();
		expect(del).toBeInTheDocument();
		expect(flagIcon).toBeInTheDocument();
		expect(penlineIcon).toBeInTheDocument();
		expect(clipboardIcon).toBeInTheDocument();
		expect(copyIcon).toBeInTheDocument();
		expect(trash2Icon).toBeInTheDocument();
	});

	it('renders the Delete button with destroy styling', () => {
		// Act
		render(<ContextMenu position={basePosition} onClose={onClose} />);
		// Assert
		const deleteBtn = screen.getByTestId('context-menu-btn-destroy');
		expect(deleteBtn).toHaveTextContent('Delete');
	});
});
