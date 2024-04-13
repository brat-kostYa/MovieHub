import { FC, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../../context/userAuthContext'
import { auth } from '../../../lib/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

const HeaderNav: FC = () => {
	const [open, setOpen] = useState(false);
    const { logOut } = useUserAuth();
    const [userImage, setUserImage] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            if (user && user.photoURL) {
                setUserImage(user.photoURL);
            } else {
                setUserImage('https://cdn-icons-png.flaticon.com/512/149/149071.png');
            }
        });

        return () => unsubscribe();
    }, []);
	

	const handleLogOut = async () => {
		await logOut();
		navigate('/'); // перенаправлення на головну сторінку після виходу
	};

	return (
		<nav className='space-x-6 flex items-center'>
			<Link className='hover:text-teal-400' to='/ourLocation'>
				Map
			</Link>
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
					<div>Profile</div>
					<img
						className='rounded-full w-8'
						src={userImage}
						alt='user'
					/>
				</div>
				{open ? (
					<ul
						className='menu absolute bg-neutral-900 w-full py-4'
						onPointerEnter={() => setOpen(true)}
						onPointerLeave={() => setOpen(false)}>
						{isAuthenticated ? (
							<li className='menu-item'>
								<Link className='block px-4 hover:text-teal-600' to='/profile'>
									My profile
								</Link>
							</li>
						) : (
							<li className='menu-item'>
								<div className='block px-4 text-gray-500 cursor-not-allowed'>
									My profile
								</div>
							</li>
						)}
						<li className='menu-item '>
							<Link onClick={handleLogOut} className='block px-4 hover:text-teal-600' to='/'>
								Sign out
							</Link>
						</li>
					</ul>
				) : null}
			</div>
		</nav>
	)
}

export default HeaderNav
