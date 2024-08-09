// Marker.tsx
import React, { useRef } from "react";
import { Vector3 } from "three";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

interface MarkerProps {
  position: Vector3;
}

const Marker: React.FC<MarkerProps> = ({ position }) => {
  const markerRef = useRef<Mesh>(null!);
  const glowRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (markerRef.current && glowRef.current) {
      // Pulsating effect for the marker
      markerRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      );

      // Rotating glow effect
      glowRef.current.rotation.y += delta * 0.5;
      glowRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Main marker */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <MeshDistortMaterial
          color="red"
          transparent
          opacity={0.2}
          distort={0.4}
          speed={10}
        />
      </mesh>
    </group>
  );
};

export default Marker;
