import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderNav from './HeaderNav'

const Header: FC = () => {
	const [navSize, setNavSize] = useState('h-32')
	const [navColor, setNavColor] = useState('bg-transparent')

	const listenScrollEvent = () => {
		window.scrollY > 10 ? setNavColor('bg-neutral-950') : setNavColor('bg-transparent')
		window.scrollY > 10 ? setNavSize('h-16') : setNavSize('h-32')
	}

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent)
		return () => {
			window.removeEventListener('scroll', listenScrollEvent)
		}
	}, [])

	return (
		<header
			className={`static w-full flex items-center text-blue-50 p-4 px-10 text-base md:text-lg z-20 ${navSize} ${navColor} transition-all duration-500 `}>
			<div className='container mx-auto flex justify-between items-center'>
				<Link to='/'>
					<img
						className='w-36 md:w-40 hover:cursor-pointer'
						src='https://ik.imagekit.io/d1m0n4ik/MovieCrazy/Logo.png?updatedAt=1688228269319'
						alt='logo'
					/>
				</Link>
				<HeaderNav />
			</div>
		</header>
	)
}

export default Header
