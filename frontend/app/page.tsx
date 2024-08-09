"use client";
import React from "react";
import Earth from "@/components/threeJs/Earth";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Marker from "@/components/threeJs/Marker";
import { Vector3 } from "three";
import Stars from "@/components/threeJs/Stars";

// Function to convert lat/long to 3D position
function latLongToVector3(lat: number, lon: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new Vector3(x, y, z);
}

export default function Home() {
  const markers = [
    { lat: 40.7128, lon: -74.006 }, // New York
    { lat: 51.5074, lon: -0.1278 }, // London
    // Add more locations as needed
  ];

  return (
    <main>
      <div className="w-screen h-screen">
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />

          <Earth />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={latLongToVector3(marker.lat, marker.lon, 1)}
            />
          ))}

          <Stars />

          <OrbitControls />
          <Environment preset="city" />
        </Canvas>
      </div>
    </main>
  );
}
