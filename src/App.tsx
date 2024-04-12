import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/layouts/header/Header'
import Catalog from './components/screens/catalog/Catalog'
import Home from './components/screens/home/Home'
import Person from './components/screens/person/Person'
import SingleMedia from './components/screens/singleMedia/SingleMedia'
import Register from './components/screens/register/Register'
import SignIn from './components/screens/signin/SignIn'
import Profile from './components/screens/userProfile/Profile'

interface IAppProps {};

const App: FC<IAppProps> = () => {
	return (
		<div className=' max-w-screen min-h-screen flex flex-col bg-neutral-950 overflow-x-hidden'>
			<Header />
			<main className='flex-grow mx-auto'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/movie'>
						<Route path='/movie' element={<Catalog key='movie' category='movie' />} />
						<Route path='/movie:id' element={<SingleMedia category='movie' />} />
					</Route>
					<Route path='/tv'>
						<Route path='/tv' element={<Catalog key='tv' category='tv' />} />
						<Route path='/tv:id' element={<SingleMedia category='tv' />} />
					</Route>
					<Route path='/person'>
						<Route path='/person' element={<Catalog key='person' category='person' />} />
						<Route path='/person:id' element={<Person />} />
					</Route>
				</Routes>
			</main>
		</div>
	)
}

export default App
