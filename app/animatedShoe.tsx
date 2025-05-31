'use client';
import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

function ShoeModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/nike-air.glb');
  const camera = useThree(state => state.camera);

  useEffect(() => {
    
    gsap.set(group.current!.position, { y: -2 });
    gsap.set(group.current!.scale, { x: 0.5, y: 0.5, z: 0.5 });
    gsap.set(group.current!.rotation, { y: Math.PI * 1.5 });
    
    
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });
    tl.to(group.current!.position, { y: 0 })
      .to(group.current!.scale, { x: 1, y: 1, z: 1 }, 0)
      .to(group.current!.rotation, { y: 0 }, 0)
      .to(camera.position, { z: 3 }, 0);
      
    
    gsap.to(group.current!.rotation, {
      y: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  return <primitive object={scene} ref={group} />;
}

export default function AnimatedShoe() {
  const containerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 20 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} /> 
        <ShoeModel />
        <OrbitControls 
          enableZoom={true}
          minDistance={2}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}