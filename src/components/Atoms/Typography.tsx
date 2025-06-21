export const Body = ({
	children,
	color,
}: {
	children: string;
	color: 'default' | 'disabled';
}) => {
	const colorStr =
		color === 'default'
			? 'text-(--color-text-black)'
			: 'text-(--color-text-gray)';
	return (
		<p className={`text-sm/[24px] font-medium ${colorStr} text-nowrap`}>
			{children}
		</p>
	);
};

export const ContextMenuText = ({
	children,
	destroy,
}: {
	children: string;
	destroy?: boolean;
}) => {
	const colorStr = destroy
		? 'text-(--color-destroy)'
		: 'text-(--color-text-black)';
	return (
		<p className={`text-sm/[16px] font-medium ${colorStr} text-nowrap`}>
			{children}
		</p>
	);
};
