import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderNav: FC = () => {
	const [open, setOpen] = useState(false)
	return (
		<nav className='space-x-6 flex items-center'>
			<Link className='hover:text-teal-400' to='/movie'>
				Movies
			</Link>
			<Link className='hover:text-teal-400' to='/tv'>
				TV
			</Link>
			<Link className='hover:text-teal-400' to='/person'>
				Person
			</Link>
			<Link className='hover:text-teal-400' to='/signin'>
				LogIn
			</Link>
			<div className='dropdown relative'>
				<div
					className={`flex space-x-4 items-center cursor-pointer hover:text-teal-400 ${open && 'text-teal-400'}`}
					onPointerEnter={() => setOpen(true)}
					onPointerLeave={() => setOpen(false)}>
					<div>UserName</div>
					<img
						className='rounded-full w-8'
						src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
						alt='user'
					/>
				</div>
				{open ? (
					<ul
						className='menu absolute bg-neutral-900 w-full py-4'
						onPointerEnter={() => setOpen(true)}
						onPointerLeave={() => setOpen(false)}>
						<li className='menu-item'>
							<Link className='block px-4 hover:text-teal-400' to='/'>
								Menu 1
							</Link>
						</li>
						<li className='menu-item '>
							<Link className='block px-4 hover:text-teal-400' to='/123'>
								Menu 1
							</Link>
						</li>
					</ul>
				) : null}
			</div>
		</nav>
	)
}

export default HeaderNav
