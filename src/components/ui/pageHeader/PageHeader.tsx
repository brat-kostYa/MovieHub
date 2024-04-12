import { FC } from 'react'
import background from '/src/assets/footer-bg.jpg'

type propsType = {
	pageTitle: string
}

const PageHeader: FC<propsType> = ({ pageTitle }) => {
	return (
		<div
			className='w-screen h-48 flex justify-center items-center text-4xl font-medium'
			style={{
				background: `linear-gradient(to top, #0a0a0a, rgba(0, 0, 0, 0)), url(${background})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}>
			{pageTitle}
		</div>
	)
}

export default PageHeader
