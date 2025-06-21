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
