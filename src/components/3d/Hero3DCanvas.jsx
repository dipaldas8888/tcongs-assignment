import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let reqId
    let animReqId
    let onMouseMoveHandler
    let onResizeHandler
    let rendererInstance

    // Defer WebGL context creation to next frame for instant initial DOM render
    reqId = requestAnimationFrame(() => {
      if (!mountRef.current) return

      // Scene setup
      const scene = new THREE.Scene()
      
      // Camera
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      )
      camera.position.z = 14

      // Renderer
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      rendererInstance = renderer
      container.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
      scene.add(ambientLight)

      const pointLightRed = new THREE.PointLight(0xE51A4B, 10, 35)
      pointLightRed.position.set(-8, 5, 8)
      scene.add(pointLightRed)

      const pointLightYellow = new THREE.PointLight(0xE2EC07, 8, 35)
      pointLightYellow.position.set(8, -4, 6)
      scene.add(pointLightYellow)

      const pointLightBlue = new THREE.PointLight(0x3B82F6, 8, 30)
      pointLightBlue.position.set(0, 7, -2)
      scene.add(pointLightBlue)

      // ── 3D Left Floating Feature: Glowing Wireframe TorusKnot ──
      const leftGroup = new THREE.Group()
      leftGroup.position.set(-6.5, 0.5, 0)

      const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32)
      const wireMat = new THREE.MeshStandardMaterial({
        color: 0xE51A4B,
        wireframe: true,
        emissive: 0x660018,
        roughness: 0.1,
        metalness: 0.9,
      })
      const knotMesh = new THREE.Mesh(knotGeo, wireMat)
      leftGroup.add(knotMesh)

      const coreGeo = new THREE.IcosahedronGeometry(1.1, 2)
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0xE2EC07,
        emissive: 0x444400,
        roughness: 0.1,
        transmission: 0.7,
        thickness: 1.0,
        transparent: true,
        opacity: 0.9,
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      leftGroup.add(coreMesh)

      scene.add(leftGroup)

      // ── 3D Right Floating Feature: Glowing Crystal Octahedron Cluster ──
      const rightGroup = new THREE.Group()
      rightGroup.position.set(6.5, -0.5, 0)

      const octaBigGeo = new THREE.OctahedronGeometry(1.8, 0)
      const octaBigMat = new THREE.MeshStandardMaterial({
        color: 0x3B82F6,
        wireframe: true,
        emissive: 0x002266,
        roughness: 0.2,
        metalness: 0.8,
      })
      const octaBigMesh = new THREE.Mesh(octaBigGeo, octaBigMat)
      rightGroup.add(octaBigMesh)

      const octaInnerGeo = new THREE.DodecahedronGeometry(0.9, 0)
      const octaInnerMat = new THREE.MeshStandardMaterial({
        color: 0xE51A4B,
        emissive: 0x330010,
        roughness: 0.2,
      })
      const octaInnerMesh = new THREE.Mesh(octaInnerGeo, octaInnerMat)
      rightGroup.add(octaInnerMesh)

      scene.add(rightGroup)

      // ── Center Background Orbit Ring ──
      const ringGeo = new THREE.TorusGeometry(6.8, 0.05, 16, 120)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xE51A4B,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.rotation.x = Math.PI / 2.5
      scene.add(ringMesh)

      // ── Secondary Floating 3D Orbs/Diamonds ──
      const floatersGroup = new THREE.Group()
      const floaters = []
      const numFloaters = 16

      const smallGeo = new THREE.TetrahedronGeometry(0.4, 0)
      const matRed = new THREE.MeshStandardMaterial({ color: 0xE51A4B, metalness: 0.8, roughness: 0.2 })
      const matYellow = new THREE.MeshStandardMaterial({ color: 0xE2EC07, metalness: 0.8, roughness: 0.2 })
      const matBlue = new THREE.MeshStandardMaterial({ color: 0x3B82F6, metalness: 0.8, roughness: 0.2 })

      for (let i = 0; i < numFloaters; i++) {
        const mat = i % 3 === 0 ? matRed : i % 3 === 1 ? matYellow : matBlue
        const mesh = new THREE.Mesh(smallGeo, mat)

        const radius = 7 + Math.random() * 5
        const angle = (i / numFloaters) * Math.PI * 2
        const yOffset = (Math.random() - 0.5) * 8

        mesh.position.set(
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius - 3
        )

        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        floatersGroup.add(mesh)

        floaters.push({
          mesh,
          rotSpeedX: (Math.random() - 0.5) * 0.03,
          rotSpeedY: (Math.random() - 0.5) * 0.03,
          initialY: yOffset,
          speedY: 0.006 + Math.random() * 0.01,
        })
      }
      scene.add(floatersGroup)

      // ── Particle Field Constellation ──
      const particlesCount = 350
      const posArray = new Float32Array(particlesCount * 3)
      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 28
        posArray[i + 1] = (Math.random() - 0.5) * 20
        posArray[i + 2] = (Math.random() - 0.5) * 16
      }

      const particlesGeo = new THREE.BufferGeometry()
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
      const particlesMat = new THREE.PointsMaterial({
        size: 0.07,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })
      const particlesMesh = new THREE.Points(particlesGeo, particlesMat)
      scene.add(particlesMesh)

      // Mouse Interaction
      let mouseX = 0
      let mouseY = 0
      let targetX = 0
      let targetY = 0

      onMouseMoveHandler = (event) => {
        const windowHalfX = window.innerWidth / 2
        const windowHalfY = window.innerHeight / 2
        mouseX = (event.clientX - windowHalfX) * 0.0012
        mouseY = (event.clientY - windowHalfY) * 0.0012
      }
      window.addEventListener('mousemove', onMouseMoveHandler, { passive: true })

      // Resize Handler
      onResizeHandler = () => {
        if (!container) return
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }
      window.addEventListener('resize', onResizeHandler)

      // Animation Loop
      const clock = new THREE.Clock()

      const animate = () => {
        animReqId = requestAnimationFrame(animate)
        const elapsedTime = clock.getElapsedTime()

        targetX += (mouseX - targetX) * 0.05
        targetY += (mouseY - targetY) * 0.05

        // Left 3D Object animation
        leftGroup.rotation.x = elapsedTime * 0.3 + targetY * 2
        leftGroup.rotation.y = elapsedTime * 0.4 + targetX * 2
        leftGroup.position.y = 0.5 + Math.sin(elapsedTime * 1.5) * 0.35

        // Right 3D Object animation
        rightGroup.rotation.x = -elapsedTime * 0.35 + targetY * 2
        rightGroup.rotation.y = -elapsedTime * 0.45 + targetX * 2
        rightGroup.position.y = -0.5 + Math.cos(elapsedTime * 1.5) * 0.35

        // Ring animation
        ringMesh.rotation.z = elapsedTime * 0.08

        // Floating items
        floaters.forEach((f) => {
          f.mesh.rotation.x += f.rotSpeedX
          f.mesh.rotation.y += f.rotSpeedY
          f.mesh.position.y = f.initialY + Math.sin(elapsedTime * 2 + f.mesh.position.x) * 0.5
        })

        // Particle constellation rotation
        particlesMesh.rotation.y = elapsedTime * 0.02
        particlesMesh.rotation.x = elapsedTime * 0.01

        // Camera lerp
        camera.position.x += (targetX * 5 - camera.position.x) * 0.05
        camera.position.y += (-targetY * 5 - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
      }

      animate()
    })

    return () => {
      if (reqId) cancelAnimationFrame(reqId)
      if (animReqId) cancelAnimationFrame(animReqId)
      if (onMouseMoveHandler) window.removeEventListener('mousemove', onMouseMoveHandler)
      if (onResizeHandler) window.removeEventListener('resize', onResizeHandler)
      if (rendererInstance && rendererInstance.domElement && container) {
        if (container.contains(rendererInstance.domElement)) {
          container.removeChild(rendererInstance.domElement)
        }
        rendererInstance.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  )
}
