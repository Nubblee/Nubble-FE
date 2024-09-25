import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styled from '@emotion/styled'

const ThreeLoading = () => {
	const mountRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		)
		const renderer = new THREE.WebGLRenderer({ antialias: true })

		// 렌더러를 부모 컨테이너의 크기에 맞게 설정
		renderer.setSize(
			mountRef.current?.clientWidth || window.innerWidth,
			mountRef.current?.clientHeight || window.innerHeight,
		)

		if (mountRef.current) {
			mountRef.current.appendChild(renderer.domElement)
		}

		// 큐브 생성
		const geometry = new THREE.BoxGeometry()
		const material = new THREE.MeshBasicMaterial({ color: 0xacc1eb, wireframe: true })
		const cube = new THREE.Mesh(geometry, material)
		scene.add(cube)

		camera.position.z = 5

		const animate = () => {
			requestAnimationFrame(animate)

			cube.rotation.x += 0.01
			cube.rotation.y += 0.01

			renderer.render(scene, camera)
		}
		animate()

		// 창 크기 변경 대응
		const handleResize = () => {
			if (mountRef.current) {
				renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
				camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
				camera.updateProjectionMatrix()
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (mountRef.current) {
				mountRef.current.removeChild(renderer.domElement)
			}
		}
	}, [])

	return (
		<LoadingContainer>
			<CanvasContainer ref={mountRef} />
		</LoadingContainer>
	)
}

export default ThreeLoading

// 스타일 정의
const LoadingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh; // 화면 전체 높이를 차지
	background-color: #333;
	overflow: hidden;
`

const CanvasContainer = styled.div`
	width: 100%;
	height: 100%; // 부모 컨테이너의 100%를 차지하도록 설정
`
