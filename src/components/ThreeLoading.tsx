import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import styled from '@emotion/styled'

const ThreeDModel = () => {
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

		renderer.setSize(window.innerWidth, window.innerHeight)
		if (mountRef.current) {
			mountRef.current.appendChild(renderer.domElement)
		}

		camera.position.z = 5

		// GLTF 모델 로드
		const loader = new GLTFLoader()
		loader.setPath('/models/') // 텍스처 경로 설정
		loader.load(
			'scene.gltf',
			(gltf: GLTF) => {
				// gltf 타입을 명시적으로 지정
				const model = gltf.scene
				model.scale.set(2, 2, 2) // 모델 크기 조정
				scene.add(model)

				const animate = () => {
					requestAnimationFrame(animate)
					model.rotation.y += 0.01 // 모델 회전
					renderer.render(scene, camera)
				}
				animate()
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
			},
			(error) => {
				console.error('An error happened', error)
			},
		)

		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight)
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (mountRef.current) {
				mountRef.current.removeChild(renderer.domElement)
			}
		}
	}, [])

	return <CanvasContainer ref={mountRef} />
}

export default ThreeDModel

// 스타일 정의
const CanvasContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #333;
`
