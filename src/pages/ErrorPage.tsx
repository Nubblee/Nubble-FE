import { useRouteError } from 'react-router-dom'
import React from 'react'

const ErrorPage: React.FC = () => {
	const error = useRouteError()
	return (
		<div>
			<h1>Oops! Something went wrong.</h1>
			<pre>{JSON.stringify(error)}</pre>
		</div>
	)
}

export default ErrorPage
