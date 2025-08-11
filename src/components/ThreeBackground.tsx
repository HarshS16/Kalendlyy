import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingOrbs() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[0.5, 32, 32]} position={[-2, 1, -2]}>
          <meshPhongMaterial color="#3B82F6" transparent opacity={0.6} />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere args={[0.3, 32, 32]} position={[2, -1, -1]}>
          <meshPhongMaterial color="#8B5CF6" transparent opacity={0.4} />
        </Sphere>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[0.4, 32, 32]} position={[0, 2, -3]}>
          <meshPhongMaterial color="#10B981" transparent opacity={0.5} />
        </Sphere>
      </Float>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <motion.div
      className="three-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <FloatingOrbs />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </motion.div>
  );
}