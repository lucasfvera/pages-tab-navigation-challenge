export const tabCardBasic =
	'flex items-center gap-1.5 rounded-lg w-min py-1.5 px-2.5';

const tabCardActive = 'border-(--color-border-gray) border-1 shadow-sm/4';
const tabCardFocus =
	'focus-visible:border-(--color-border-blue) focus-visible:outline-2 focus-visible:outline-(--color-border-blue)/25';
const tabCardHover = 'hover:bg-(--color-icon-light-gray)/35';
const tabCardDefault =
	'bg-(--color-icon-light-gray)/25 shadow-sm/4 text-(--color-text-gray) cursor-pointer';

export const styles = {
	active: `${tabCardActive} ${tabCardFocus}`,
	default: `${tabCardDefault} ${tabCardFocus} ${tabCardHover}`,
};

export type TabCardStates = keyof typeof styles;
