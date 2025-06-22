import { MOCKED_PAGES } from '@/helpers/mockPages';
import Link from 'next/link';

export default async function FormPage({
	params,
}: {
	params: Promise<{ uuid: string }>;
}) {
	const { uuid } = await params;
	const page = MOCKED_PAGES.find((page) => page.id === uuid);

	return (
		<div className="flex w-full bg-amber-300 h-full flex-1 rounded-lg items-center justify-center">
			{page ? (
				page.title
			) : (
				<div>
					<p>{"Oops! We couldn't find the page"}</p>{' '}
					<Link href={'/'} className="text-blue-600 hover:underline">
						Go back home
					</Link>
				</div>
			)}
		</div>
	);
}
