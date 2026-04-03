import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Float, PresentationControls } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

function CrackedChevron() {
  const mesh = useRef()
  const materialRef = useRef()
  const [active, setActive] = useState(false)
  
  // Create an explicit scroll tracker
  const scrollRef = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const geometry = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 3)
    s.lineTo(2, 0)
    s.lineTo(0, -3)
    s.lineTo(-1, -3)
    s.lineTo(1, 0)
    s.lineTo(-1, 3)
    s.lineTo(0, 3)

    const extrudeSettings = {
      steps: 1,
      depth: 0.8,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.15,
      bevelOffset: 0,
      bevelSegments: 4
    }
    
    // We create the extruded geometry, then detach all triangles so they can shatter
    const geom = new THREE.ExtrudeGeometry(s, extrudeSettings)
    geom.center()
    const nonIndexed = geom.toNonIndexed()
    
    const positionAttribute = nonIndexed.getAttribute('position')
    const count = positionAttribute.count
    const randomDirs = new Float32Array(count * 3)
    const centers = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 3) {
      const vA = new THREE.Vector3(positionAttribute.getX(i), positionAttribute.getY(i), positionAttribute.getZ(i))
      const vB = new THREE.Vector3(positionAttribute.getX(i+1), positionAttribute.getY(i+1), positionAttribute.getZ(i+1))
      const vC = new THREE.Vector3(positionAttribute.getX(i+2), positionAttribute.getY(i+2), positionAttribute.getZ(i+2))
      
      const center = vA.clone().add(vB).add(vC).divideScalar(3)
      const dir = center.clone().normalize().add(new THREE.Vector3((Math.random() - 0.5)*0.5, (Math.random() - 0.5)*0.5, (Math.random() - 0.5)*0.5)).normalize()
      
      for (let j = 0; j < 3; j++) {
        const idx = i + j
        randomDirs[idx * 3] = dir.x
        randomDirs[idx * 3 + 1] = dir.y
        randomDirs[idx * 3 + 2] = dir.z
        
        centers[idx * 3] = center.x
        centers[idx * 3 + 1] = center.y
        centers[idx * 3 + 2] = center.z
      }
    }
    
    nonIndexed.setAttribute('aRandomDir', new THREE.BufferAttribute(randomDirs, 3))
    nonIndexed.setAttribute('aCenter', new THREE.BufferAttribute(centers, 3))
    nonIndexed.setAttribute('aOriginalPosition', positionAttribute.clone())
    
    return nonIndexed
  }, [])

  const progress = useRef(0)

  useFrame((state, delta) => {
    // Smoothen the active crack progress
    const targetProgress = active ? 1 : 0
    progress.current = THREE.MathUtils.damp(progress.current, targetProgress, 4, delta)

    if (mesh.current) {
      // Base rotation
      mesh.current.rotation.y += delta * 0.1
      
      // Scroll interplay: rotate faster and scale slightly down when scrolling
      const scrollY = scrollRef.current
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, scrollY * 0.005, 0.1)
      const scaleBase = 1 - Math.min(scrollY * 0.0005, 0.5)
      mesh.current.scale.setScalar(scaleBase)
    }

    // Explode logic (Vertex Mutation)
    const posAttr = geometry.getAttribute('position')
    const origAttr = geometry.getAttribute('aOriginalPosition')
    const randAttr = geometry.getAttribute('aRandomDir')
    const centerAttr = geometry.getAttribute('aCenter')
    
    if (posAttr && origAttr && randAttr && centerAttr) {
      if (progress.current > 0.001) {
        // We scale the fragment down slightly to show clear cracks
        const scale = 1.0 - progress.current * 0.4
        const push = Math.pow(progress.current, 1.5) * 6.0
        
        for (let i = 0; i < posAttr.count; i++) {
          const base = i * 3
          
          const oX = origAttr.array[base]
          const oY = origAttr.array[base + 1]
          const oZ = origAttr.array[base + 2]

          const rX = randAttr.array[base]
          const rY = randAttr.array[base + 1]
          const rZ = randAttr.array[base + 2]
          
          const cX = centerAttr.array[base]
          const cY = centerAttr.array[base + 1]
          const cZ = centerAttr.array[base + 2]
          
          // Shrink towards center + push away radially
          posAttr.array[base] = cX + (oX - cX) * scale + rX * push
          posAttr.array[base + 1] = cY + (oY - cY) * scale + rY * push
          posAttr.array[base + 2] = cZ + (oZ - cZ) * scale + rZ * push
        }
        posAttr.needsUpdate = true
      } else if (posAttr.array[0] !== origAttr.array[0]) {
        for (let i = 0; i < posAttr.array.length; i++) {
            posAttr.array[i] = origAttr.array[i]
        }
        posAttr.needsUpdate = true
      }
    }
    
    // Animate material roughness when cracked
    if (materialRef.current) {
        materialRef.current.roughness = THREE.MathUtils.lerp(0.1, 0.4, progress.current)
    }
  })

  // We set cursor 'grab' automatically by presentation controls, but we can override when dragging:
  useEffect(() => {
    document.body.style.cursor = active ? 'grabbing' : 'auto'
    return () => { document.body.style.cursor = 'auto' }
  }, [active])

  return (
    <Float floatIntensity={1} speed={2} rotationIntensity={0.5}>
      <mesh 
        ref={mesh} 
        geometry={geometry}
        onPointerOver={(e) => { e.stopPropagation(); setActive(true) }}
        onPointerOut={(e) => { setActive(false) }}
      >
        <MeshTransmissionMaterial 
          ref={materialRef}
          backside={true}
          samples={4}
          thickness={1.5}
          chromaticAberration={0.5}
          anisotropy={0.4}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1} // gives it a fluid glass feel at rest
          clearcoat={1}
          attenuationDistance={3}
          attenuationColor="#ffffff"
          color="#9d4edd" // intense purple for dark scheme
          ior={1.4}
          roughness={0.1}
          transmission={1}
        />
      </mesh>
    </Float>
  )
}

export default function Hero3DObject() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 40 }} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#c77dff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#3c096c" />
      <PresentationControls
         global
         config={{ mass: 2, tension: 500 }}
         snap={{ mass: 4, tension: 1500 }}
         rotation={[0, 0.2, 0]}
         polar={[-Math.PI / 4, Math.PI / 4]}
         azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <CrackedChevron />
      </PresentationControls>
      <Environment preset="night" />
    </Canvas>
  )
}
