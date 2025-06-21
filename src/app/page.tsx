import { PagesNavigationBar } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar';

export default function Home() {
	return (
		<div className="flex flex-col h-full p-8 gap-8">
			<h1>Welcome to Fillout</h1>
			<div className="flex w-full bg-amber-300 h-full flex-1 rounded-lg items-center justify-center">
				Test Page
			</div>
			<PagesNavigationBar />
		</div>
	);
}
