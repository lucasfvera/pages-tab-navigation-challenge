export const tabCardBasic =
	'flex items-center gap-1.5 rounded-lg w-max py-1.5 px-2.5 z-10!';

const tabCardActive =
	'bg-white border-(--color-border-gray) border-1 shadow-sm/4';
const tabCardFocus =
	'focus-visible:border-(--color-border-blue) focus-visible:outline-2 focus-visible:outline-(--color-border-blue)/25';
const tabCardHover = 'hover:bg-(--color-bg-gray)';
const tabCardDefault =
	'bg-(--color-bg-light-gray) shadow-sm/4 text-(--color-text-gray) cursor-pointer';

export const styles = {
	active: `${tabCardActive} ${tabCardFocus}`,
	default: `${tabCardDefault} ${tabCardFocus} ${tabCardHover}`,
};

export type TabCardStates = keyof typeof styles;
