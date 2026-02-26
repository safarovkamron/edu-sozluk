import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	metadataBase: new URL('https://edu-sozluk.vercel.app/'),

	title: {
		default: 'Sözlük – Interaktiv Lug‘at O‘yini',
		template: '%s | Sözlük',
	},

	description:
		'Sözlük — interaktiv lug‘at va tarjima o‘yini. So‘zlarni tez va samarali yodlang, natijalarni ulashing va do‘stlaringiz bilan bellashing.',

	keywords: [
		'sozluk',
		'lugat oyini',
		'uzbek turk lugat',
		'til organish',
		'vocabulary game',
		'telegram share game',
	],

	authors: [{ name: 'Sözlük Team' }],
	creator: 'Sözlük',
	publisher: 'Sözlük',

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},

	openGraph: {
		type: 'website',
		locale: 'uz_UZ',
		url: 'https://edu-sozluk.vercel.app/',
		siteName: 'Sözlük',
		title: 'Sözlük – Interaktiv Lug‘at O‘yini',
		description:
			'So‘zlarni tez yodlang, juftliklarni toping va natijani do‘stlaringiz bilan ulashing.',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Sözlük Vocabulary Game',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'Sözlük – Interaktiv Lug‘at O‘yini',
		description: 'So‘zlarni tez yodlang va natijalarni ulashing.',
		images: ['/og-image.jpg'],
	},

	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},

	manifest: '/site.webmanifest',

	category: 'education',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}
			>
				{children}
			</body>
		</html>
	)
}
