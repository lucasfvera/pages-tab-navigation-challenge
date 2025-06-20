export const tabCardBasic =
	'flex items-center gap-1.5 rounded-lg w-min py-1.5 px-2.5';

const tabCardActive = 'border-(--color-border-gray) border-1 shadow-sm/4';

export const styles = {
	active: tabCardActive,
	focused: '',
	default: '',
	hover: '',
};

export type TabCardStates = keyof typeof styles;
