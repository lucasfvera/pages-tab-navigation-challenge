import { MOCKED_PAGES } from '@/helpers/mockPages';

export default async function FormPage({
	params,
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;
	const page = MOCKED_PAGES.find((page) => page.id === uuid);

	return (
		<div className="flex w-full bg-amber-300 h-full flex-1 rounded-lg items-center justify-center">
			{page?.title}
		</div>
	);
}
