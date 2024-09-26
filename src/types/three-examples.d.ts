// src/types/three-examples.d.ts
declare module 'three/examples/jsm/loaders/GLTFLoader' {
	import { Loader, LoadingManager, Group } from 'three'

	export class GLTFLoader extends Loader {
		constructor(manager?: LoadingManager)
		load(
			url: string,
			onLoad: (gltf: GLTF) => void,
			onProgress?: (event: ProgressEvent) => void,
			onError?: (event: ErrorEvent) => void,
		): void
		parse(data: ArrayBuffer | string, path: string, onLoad: (gltf: GLTF) => void): void

		setPath(path: string): this // 여기에 setPath 추가
	}

	export interface GLTF {
		scene: Group
		// 필요한 타입을 추가로 정의
	}
}
