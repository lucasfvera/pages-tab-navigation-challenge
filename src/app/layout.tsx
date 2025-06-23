import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PagesNavigationBar } from '@/components/Molecules/PagesNavigationBar/PagesNavigationBar';
import { LocalPagesContextProvider } from '@/contexts/LocalPagesContext/LocalPagesContextProvider';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Fillout Form Builder',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body className={`${inter.className} antialiased h-full`}>
				<LocalPagesContextProvider>
					<div className="flex flex-col h-full p-8 gap-8">
						<h1>Welcome to Fillout</h1>
						{children}
						<PagesNavigationBar />
					</div>
				</LocalPagesContextProvider>
			</body>
		</html>
	);
}
