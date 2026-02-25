import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'
import { cn } from '@/lib/utils'

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='relative flex h-screen w-full overflow-hidden'>
			<StarsBackground
				starColor='#000'
				speed={30}
				className={cn(
					'absolute inset-0 z-0',
					'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]',
					'bg-[radial-gradient(ellipse_at_bottom,_#cbdcff_0%,_#a9c8ff_60%,_#93bbff_100%)]',
				)}
			/>

			<main className='relative z-10 mx-4 my-2 overflow-y-auto w-full'>
				{children}
			</main>
		</div>
	)
}

export default Layout
