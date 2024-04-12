import React from 'react'
import ReactDOM from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.scss'
import store from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<SkeletonTheme baseColor='#202020' highlightColor='#444'>
				<Provider store={store}>
					<App />
				</Provider>
			</SkeletonTheme>
		</BrowserRouter>
	</React.StrictMode>
)
