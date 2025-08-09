"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GeoJSONWorldData } from "@/types/geoJson";
import { useEffect, useRef, useState } from "react";

function Globe({
  onCountryClick,
}: {
  onCountryClick: (country: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [geoData, setGeoData] = useState<GeoJSONWorldData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isAltPressed, setIsAltPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.metaKey) {
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.altKey && !event.metaKey) {
        setIsAltPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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

  const createCountryPolygon = (coordinates: number[][]) => {
    const points: THREE.Vector3[] = [];

    coordinates.forEach(([lon, lat]) => {
      const sphereCoords = convertToSphereCoordinates(lon, lat);
      points.push(
        new THREE.Vector3(sphereCoords.x, sphereCoords.y, sphereCoords.z),
      );
    });

    if (points.length < 3) return null;

    // Create triangulated geometry from the polygon points
    const vertices: number[] = [];
    const indices: number[] = [];

    // Add all points
    points.forEach((point) => {
      vertices.push(point.x, point.y, point.z);
    });

    // Fan triangulation from first vertex
    for (let i = 1; i < points.length - 1; i++) {
      indices.push(0, i, i + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(indices);
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    geometry.computeVertexNormals();

    return geometry;
  };

  const createCountryMeshes = () => {
    if (!geoData) return null;

    const meshes: React.ReactElement[] = [];

    geoData.features.forEach((feature, featureIndex) => {
      const { geometry, properties } = feature;
      const countryName =
        properties.name || properties.admin || `Country ${featureIndex}`;
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

        if (points.length > 2) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const isSelected = selectedCountry === countryName;
          const hasSelection = selectedCountry !== null;

          // Create filled geometry for better click detection
          const filledGeometry = createCountryPolygon(ring);

          meshes.push(
            <group key={`country-${featureIndex}-${ringIndex}`}>
              {/* Filled mesh for click detection */}
              {filledGeometry && (
                <mesh
                  geometry={filledGeometry}
                  onClick={(e) => {
                    if (!isAltPressed) return;
                    e.stopPropagation();
                    if (selectedCountry === countryName) {
                      setSelectedCountry(null);
                      onCountryClick(null);
                    } else {
                      setSelectedCountry(countryName);
                      onCountryClick(countryName);
                    }
                  }}>
                  <meshBasicMaterial
                    transparent
                    opacity={0}
                    side={THREE.DoubleSide}
                    depthTest={true}
                  />
                </mesh>
              )}

              {/* Visible line boundary */}
              <primitive
                object={
                  new THREE.Line(
                    lineGeometry,
                    new THREE.LineBasicMaterial({
                      color: isSelected ? "#00ff00" : "#ffffff",
                      transparent: true,
                      opacity: isSelected ? 1.0 : hasSelection ? 0.3 : 0.7,
                      linewidth: isSelected ? 3 : 1,
                      depthTest: isSelected ? false : true,
                      depthWrite: isSelected ? false : true,
                    }),
                  )
                }
              />
            </group>,
          );
        }
      });
    });

    return meshes;
  };

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 32]} />
        <meshBasicMaterial color="black" transparent opacity={0.85} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.01, 64, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {createCountryMeshes()}
    </group>
  );
}

function CountryNameDisplay({
  selectedCountry,
}: {
  selectedCountry: string | null;
}) {
  if (!selectedCountry) return null;

  return (
    <div className="absolute top-6 left-6 z-30 transform rounded-none border border-green-500/50 bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
      <p className="font-mono text-lg font-semibold text-green-400 uppercase">
        {selectedCountry}
      </p>
    </div>
  );
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [modifierKey, setModifierKey] = useState<string>("Alt/Option");

  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes("mac") || userAgent.includes("darwin")) {
        setModifierKey("Option");
      } else if (userAgent.includes("win")) {
        setModifierKey("Alt");
      } else {
        setModifierKey("Alt"); // Default for Linux and other platforms
      }
    };

    detectPlatform();
  }, []);

  return (
    <div className="relative h-full w-full">
      <CountryNameDisplay selectedCountry={selectedCountry} />
      <p className="absolute right-6 bottom-6 z-30 rounded-none border border-white/30 bg-black/50 px-3 py-2 font-mono font-normal text-xs text-white backdrop-blur-sm">
        Hold
        <span className="font-extrabold">{` ${modifierKey} `}</span>
        key + click inside country to select
      </p>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe onCountryClick={setSelectedCountry} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.5}
          minDistance={4}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}
