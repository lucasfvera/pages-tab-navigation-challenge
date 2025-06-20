const tabCardActive =
	'gap-1.5 border-(--color-gray-border) border-1 rounded-lg w-min py-1.5 px-2.5 shadow-sm';

export const styles = {
	active: tabCardActive,
	focused: '',
	default: '',
	hover: '',
};

export type TabCardStates = keyof typeof styles;
