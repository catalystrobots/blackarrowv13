import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { Loader2, AlertCircle } from 'lucide-react';

interface ModelViewerProps {
  file: File;
  thumbnail?: boolean;
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center space-x-2 text-red-500">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}

export function ModelViewer({ file, thumbnail = false }: ModelViewerProps) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    const loadModel = async () => {
      if (!file) {
        setError('No file provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setGeometry(null);

      const extension = file.name.split('.').pop()?.toLowerCase();

      if (!extension) {
        setError('Invalid file format');
        setIsLoading(false);
        return;
      }

      if (!['stl', 'obj'].includes(extension)) {
        setError('Unsupported file format. Please use STL or OBJ files.');
        setIsLoading(false);
        return;
      }

      try {
        const reader = new FileReader();

        const readerPromise = new Promise<ArrayBuffer | string>((resolve, reject) => {
          reader.onload = () => {
            if (reader.result) {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to read file'));
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
        });

        if (extension === 'stl') {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsText(file);
        }

        const result = await readerPromise;

        if (!isMounted) return;

        let loadedGeometry: THREE.BufferGeometry;

        if (extension === 'stl') {
          const loader = new STLLoader();
          loadedGeometry = loader.parse(result as ArrayBuffer);
        } else {
          const loader = new OBJLoader();
          const object = loader.parse(result as string);
          if (!object.children[0]) {
            throw new Error('Invalid OBJ file structure');
          }
          loadedGeometry = (object.children[0] as THREE.Mesh).geometry;
        }

        // Ensure geometry has normals
        if (!loadedGeometry.attributes.normal) {
          loadedGeometry.computeVertexNormals();
        }

        // Center and normalize the geometry
        const box = new THREE.Box3().setFromBufferAttribute(
          loadedGeometry.attributes.position
        );
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        const normalizedGeometry = loadedGeometry.clone();
        normalizedGeometry.translate(-center.x, -center.y, -center.z);
        normalizedGeometry.scale(scale, scale, scale);

        if (!isMounted) {
          normalizedGeometry.dispose();
          return;
        }

        setGeometry(normalizedGeometry);
        setError(null);

        // Reset camera view
        if (controlsRef.current) {
          setTimeout(() => {
            if (controlsRef.current && isMounted) {
              controlsRef.current.reset();
              controlsRef.current.update();
            }
          }, 100);
        }
      } catch (err) {
        if (!isMounted) return;
        
        const errorMessage = err instanceof Error ? err.message : 'Failed to load 3D model';
        console.error('Error loading 3D model:', err);
        setError(errorMessage);
        setGeometry(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      isMounted = false;
      if (geometry) {
        geometry.dispose();
      }
    };
  }, [file]);

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className={`relative w-full h-full ${thumbnail ? 'cursor-pointer' : ''}`}>
      {isLoading && <LoadingSpinner />}
      {geometry && (
        <Canvas 
          shadows
          dpr={[1, 2]}
          className="w-full h-full"
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1}
          />
          <Suspense fallback={null}>
            <Center>
              <mesh geometry={geometry}>
                <meshStandardMaterial 
                  color="#808080" 
                  roughness={0.5} 
                  metalness={0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </Center>
          </Suspense>
          <OrbitControls 
            ref={controlsRef}
            autoRotate={false}
            enableZoom={!thumbnail}
            enablePan={!thumbnail}
            minDistance={2}
            maxDistance={10}
            makeDefault
          />
        </Canvas>
      )}
    </div>
  );
}