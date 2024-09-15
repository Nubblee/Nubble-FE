import React from 'react'
import styled from '@emotion/styled'
import BestContents from '@components/BestContents'

const Home: React.FC = () => {
	return (
		<Container>
			<BestContents />
			<h1>Welcome to the Home Page</h1>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
`

export default Home
