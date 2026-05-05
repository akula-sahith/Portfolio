import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 5000;

function generateBrainPoints(count: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Surface-based points for folds
    let u = Math.random() * Math.PI * 2;
    let v = Math.random() * Math.PI;
    let r = 2.0 + Math.random() * 0.6;
    
    let x = r * Math.sin(v) * Math.cos(u);
    let y = r * Math.sin(v) * Math.sin(u);
    let z = r * Math.cos(v);
    
    // Reshape to an elongated brain
    z *= 1.2;
    x *= 0.8;
    
    // Separate into two hemispheres
    x += x > 0 ? 0.15 : -0.15;
    
    // Generate organic folds (sulci/gyri)
    let noise = Math.sin(x * 6) * Math.cos(y * 6) * Math.sin(z * 6) * 0.15;
    x += noise;
    y += noise;
    z += noise;

    points[i * 3] = x;
    points[i * 3 + 1] = y + 0.5;
    points[i * 3 + 2] = z;
  }
  return points;
}

function generateMobileWebPoints(count: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y, z;
    const r = Math.random();
    if (r < 0.4) {
      // Mobile Phone Outline (standing on the left)
      const isEdgeX = Math.random() < 0.5;
      if (isEdgeX) {
         x = (Math.random() < 0.5 ? -0.8 : 0.8) - 1.5;
         y = (Math.random() - 0.5) * 3.2;
      } else {
         x = (Math.random() - 0.5) * 1.6 - 1.5;
         y = (Math.random() < 0.5 ? -1.6 : 1.6);
      }
      z = 0;
    } else if (r < 0.7) {
      // Web Browser screen outline (on the right)
      const isEdgeX = Math.random() < 0.5;
      if (isEdgeX) {
         x = (Math.random() < 0.5 ? -1.8 : 1.8) + 1.2;
         y = (Math.random() - 0.5) * 2.2 + 0.5;
      } else {
         x = (Math.random() - 0.5) * 3.6 + 1.2;
         y = (Math.random() < 0.5 ? -1.1 : 1.1) + 0.5;
      }
      z = -1;
    } else {
      // connecting data nodes
      x = (Math.random() - 0.5) * 5.0;
      y = (Math.random() - 0.5) * 4.0;
      z = (Math.random() - 0.5) * 2.0;
    }
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function generateEyePoints(count: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y, z;
    const r = Math.random();

    if (r < 0.3) {
      // Upper and lower eye arcs
      const t = (Math.random() - 0.5) * Math.PI; // -pi/2 to pi/2
      const radius = 2.5;
      x = Math.sin(t) * radius;
      y = Math.cos(t) * radius - radius;
      if (Math.random() < 0.5) {
        y = -y; // lower arc
      }
      z = 0;
    } else if (r < 0.6) {
      // Iris (circle)
      const t = Math.random() * Math.PI * 2;
      const radius = 1.0;
      x = Math.cos(t) * radius;
      y = Math.sin(t) * radius;
      z = 0.2;
    } else if (r < 0.8) {
      // Pupil (filled)
      const t = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.4;
      x = Math.cos(t) * radius;
      y = Math.sin(t) * radius;
      z = 0.4;
    } else {
      // Bounding box (Computer vision tracking)
      const isEdgeX = Math.random() < 0.5;
      const s = 1.6; // size
      if (isEdgeX) {
         x = (Math.random() < 0.5 ? -s : s);
         y = (Math.random() - 0.5) * s * 2;
      } else {
         x = (Math.random() - 0.5) * s * 2;
         y = (Math.random() < 0.5 ? -s : s);
      }
      z = 0.5;
    }
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function generateCloudServerPoints(count: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y, z;
    const r = Math.random();
    if (r < 0.4) {
      // Cloud shape (3 overlapping spheres)
      const sphereIdx = Math.floor(Math.random() * 3);
      const angle = Math.random() * Math.PI * 2;
      const radiusBase = Math.random() * Math.random();
      const cx = sphereIdx === 0 ? -1 : sphereIdx === 1 ? 0 : 1;
      const cy = sphereIdx === 1 ? 1.5 : 1.0;
      const cr = sphereIdx === 1 ? 1.2 : 0.8;
      
      x = cx + Math.cos(angle) * cr * radiusBase;
      y = cy + Math.sin(angle) * cr * radiusBase;
      z = (Math.random() - 0.5) * cr;
    } else if (r < 0.8) {
      // Server racks below (two towers)
      const tower = Math.random() < 0.5 ? -1 : 1;
      const isEdgeY = Math.random() < 0.2; // horizontal slots
      if (isEdgeY) {
         x = tower * 1.5 + (Math.random() - 0.5) * 1.2;
         y = -1.0 + Math.floor(Math.random() * 5) * 0.4; // 5 server levels
         z = (Math.random() - 0.5) * 1.0;
      } else {
         // tower box boundary
         x = tower * 1.5 + (Math.random() - 0.5) * 1.2;
         y = -1.0 + (Math.random() - 0.5) * 2.0;
         z = (Math.random() - 0.5) * 1.0;
      }
    } else {
      // Data link particles flying between rack and cloud
      x = (Math.random() - 0.5) * 2.0;
      y = Math.random() * 1.5 - 0.5;
      z = (Math.random() - 0.5) * 0.5;
    }

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

const SHAPES = [
  generateMobileWebPoints(PARTICLE_COUNT),
  generateBrainPoints(PARTICLE_COUNT),
  generateEyePoints(PARTICLE_COUNT),
  generateCloudServerPoints(PARTICLE_COUNT),
];

function MorphingParticles({ activeIndex }: { activeIndex: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const targetPositions = useMemo(() => SHAPES[activeIndex % SHAPES.length], [activeIndex]);
  
  const currentPositions = useMemo(() => new Float32Array(SHAPES[0]), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Prevent explosion on large delta (e.g., when tab is backgrounded)
    const lerpFactor = Math.min(delta * 3.0, 1.0);
    
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        // smoothly interpolate to target
        positions[i] += (targetPositions[i] - positions[i]) * lerpFactor;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.2;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={currentPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AboutVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <MorphingParticles activeIndex={activeIndex} />
        </Float>
        <Sparkles count={150} scale={12} size={3} opacity={0.4} speed={0.4} color="#38bdf8" />
      </Canvas>
    </div>
  );
}
