"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GeoJSONWorldData } from "@/types/geoJson";
import { useEffect, useRef, useState } from "react";

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const [geoData, setGeoData] = useState<GeoJSONWorldData | null>(null);

  useEffect(() => {
    fetch("/world.geojson")
      .then((response) => response.json())
      .then((data: GeoJSONWorldData) => setGeoData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const convertToSphereCoordinates = (lon: number, lat: number, radius = 2) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
      x: -radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };
  };

  const createCountryLines = () => {
    if (!geoData) return null;

    const lines: React.ReactElement[] = [];

    geoData.features.forEach((feature, featureIndex) => {
      const { geometry } = feature;
      let coordinateArrays: number[][][] = [];

      if (geometry.type === "Polygon") {
        coordinateArrays = geometry.coordinates as number[][][];
      } else if (geometry.type === "MultiPolygon") {
        const multiPolygon = geometry.coordinates as number[][][][];
        coordinateArrays = multiPolygon.flat();
      }

      coordinateArrays.forEach((ring, ringIndex) => {
        const points: THREE.Vector3[] = [];

        ring.forEach(([lon, lat]) => {
          const sphereCoords = convertToSphereCoordinates(lon, lat);
          points.push(
            new THREE.Vector3(sphereCoords.x, sphereCoords.y, sphereCoords.z),
          );
        });

        if (points.length > 1) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          lines.push(
            <primitive
              key={`${featureIndex}-${ringIndex}`}
              object={
                new THREE.Line(
                  lineGeometry,
                  new THREE.LineBasicMaterial({
                    color: "#ffffff",
                    transparent: true,
                    opacity: 0.3,
                  }),
                )
              }
            />,
          );
        }
      });
    });

    return lines;
  };

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 32]} />
        <meshBasicMaterial color="#0B0B0D" transparent opacity={0.9} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.01, 64, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {createCountryLines()}
    </group>
  );
}

export default function Home() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Globe />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.6}
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={10}
      />
    </Canvas>
  );
}
