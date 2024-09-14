import React from 'react'
import styled from '@emotion/styled'

const Home: React.FC = () => {
	return (
		<Container>
			<h1>Welcome to the Home Page</h1>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
`

export default Home
