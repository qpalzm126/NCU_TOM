import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, ShaderMaterial, TextureLoader } from "three";
import { Sphere } from "@react-three/drei";

interface SunProps {
  position?: [number, number, number];
  size?: number;
}

const Sun: React.FC<SunProps> = ({ position = [0, 0, 0], size = 1 }) => {
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  // Load the texture
  const texture = useLoader(TextureLoader, "/8k_sun.jpg");

  // Shader for the glow effect
  const glowShader = useMemo(
    () => ({
      uniforms: {
        coefficient: { value: 0.8 },
        power: { value: 20 },
        glowColor: { value: [1, 0.8, 0.3] },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float coefficient;
        uniform float power;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(coefficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
    }),
    []
  );

  // useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += delta * 0.5;
  //   }
  //   if (glowRef.current) {
  //     glowRef.current.rotation.y += delta * 0.5;
  //   }
  // });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[size, 128, 128]}>
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshBasicMaterial color="yellow" />
        )}
      </Sphere>
      <Sphere ref={glowRef} args={[size * 1.05, 32, 32]}>
        <shaderMaterial
          attach="material"
          args={[glowShader]}
          transparent={true}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
};

export default Sun;
