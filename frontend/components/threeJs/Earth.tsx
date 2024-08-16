"use client";
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Effects,
  useTexture,
} from "@react-three/drei";
import { Mesh } from "three";

const Earth = () => {
  const meshRef = useRef<Mesh>(null!);
  const texture = useTexture("/8k_earth_daymap.jpg");

  // useFrame((state, delta) => {
  //   meshRef.current.rotation.y += delta * 0.1;
  //   meshRef.current.rotation.x += delta * 0.1;
  // });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Earth;
