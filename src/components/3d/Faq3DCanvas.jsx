import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Faq3DCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 12

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const light1 = new THREE.PointLight(0xE51A4B, 6, 25)
    light1.position.set(-5, 3, 4)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x3B82F6, 5, 25)
    light2.position.set(5, -3, 3)
    scene.add(light2)

    // ── Floating 3D Geometries for FAQ ──
    const group = new THREE.Group()

    // 1. Crystal Dodecahedron
    const dodGeo = new THREE.DodecahedronGeometry(1.5, 0)
    const dodMat = new THREE.MeshPhysicalMaterial({
      color: 0xE51A4B,
      wireframe: true,
      emissive: 0x330010,
      roughness: 0.1,
      metalness: 0.8,
    })
    const dodMesh = new THREE.Mesh(dodGeo, dodMat)
    dodMesh.position.set(-4.5, 1.5, -1)
    group.add(dodMesh)

    // 2. Glowing Inner Core for Dodecahedron
    const dodCoreGeo = new THREE.IcosahedronGeometry(0.8, 1)
    const dodCoreMat = new THREE.MeshStandardMaterial({
      color: 0xE2EC07,
      emissive: 0x555500,
      roughness: 0.3,
    })
    const dodCoreMesh = new THREE.Mesh(dodCoreGeo, dodCoreMat)
    dodCoreMesh.position.set(-4.5, 1.5, -1)
    group.add(dodCoreMesh)

    // 3. Right Floating Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 0)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      wireframe: true,
      emissive: 0x001133,
      metalness: 0.9,
    })
    const icoMesh = new THREE.Mesh(icoGeo, icoMat)
    icoMesh.position.set(4.5, -1.8, -1)
    group.add(icoMesh)

    // 4. Center Background Floating Ring
    const torusGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 100)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xE51A4B,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const torusMesh = new THREE.Mesh(torusGeo, torusMat)
    torusMesh.position.set(0, 0, -3)
    torusMesh.rotation.x = Math.PI / 3
    group.add(torusMesh)

    scene.add(group)

    // Floating Dust Particles
    const dustCount = 150
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 20
      dustPos[i + 1] = (Math.random() - 0.5) * 15
      dustPos[i + 2] = (Math.random() - 0.5) * 10
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xE51A4B,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })
    const dustPoints = new THREE.Points(dustGeo, dustMat)
    scene.add(dustPoints)

    // Mouse lerp
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let clock = new THREE.Clock()
    let reqId

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      dodMesh.rotation.x = t * 0.4 + mouseY
      dodMesh.rotation.y = t * 0.5 + mouseX
      dodCoreMesh.rotation.x = -t * 0.5
      dodCoreMesh.rotation.y = -t * 0.6

      icoMesh.rotation.x = -t * 0.35 + mouseY
      icoMesh.rotation.y = t * 0.45 + mouseX

      torusMesh.rotation.z = t * 0.15
      dustPoints.rotation.y = t * 0.02

      group.position.x = mouseX * 0.8
      group.position.y = -mouseY * 0.8

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.7 }}
    />
  )
}
