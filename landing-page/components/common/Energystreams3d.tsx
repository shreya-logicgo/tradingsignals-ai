"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const RISING_COUNT  = 60;   // vertical strands rising from convergence point
const FLOOR_COUNT   = 40;   // horizontal floor streaks rushing to camera
const HORIZON_COUNT = 20;   // thin horizon arc lines

// ─── RISING STRANDS (the fountain of light going upward) ────────────────────
const risingVert = `
  varying vec2  vUv;
  varying float vAlpha;
  attribute float aIndex;
  attribute float aOffset;
  uniform float   uTime;

  void main() {
    vUv = uv;

    float t       = aIndex / ${RISING_COUNT}.0;          // 0..1 across strands
    float side    = sign(t - 0.5);                        // -1 left, +1 right
    float absT    = abs(t - 0.5) * 2.0;                  // 0 centre → 1 edge

    // --- each strand starts near the vanishing point (0,0,0 in world) -------
    vec3 pos = position;                                  // local plane coord

    // Y is the "height along strand": pos.y goes -7..7 from plane geometry
    float y = pos.y;

    // Perspective convergence: strands spread as they rise
    // At y=-7 (bottom) strands are tightly packed; at y=7 they fan out wide
    float riseT   = (y + 7.0) / 14.0;                    // 0 at bottom, 1 top
    float spread  = absT * mix(0.05, 9.0, pow(riseT, 1.4));
    pos.x += side * spread;

    // Gentle sine wave liquid motion
    float wave    = sin(y * 0.6 + uTime * 1.4 + aOffset) * 0.18 * (1.0 - riseT * 0.5);
    pos.x        += wave;

    // Subtle z-depth curl — strands curve slightly toward camera at top
    pos.z        += riseT * absT * 0.8 + sin(uTime * 0.7 + aOffset) * 0.06;

    // The "horizon" start: push bottom of all strands to origin (convergence)
    // so they appear to burst from a single point
    pos.y         = y;  // keep Y natural; camera tilt does the perspective magic

    vAlpha        = 1.0;
    gl_Position   = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const risingFrag = `
  varying vec2  vUv;
  uniform float uTime;

  void main() {
    // Scrolling data-dot pattern
    float dots    = step(0.88, fract(vUv.y * 22.0 - uTime * 4.0));

    // Centre horizontal glow
    float glow    = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 5.0);

    // Fade top and bottom of each strand
    float fade    = pow(smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.72, vUv.y), 0.7);

    // Palette: deep sapphire → electric cyan → white core
    vec3 sapphire = vec3(0.01, 0.05, 0.55);
    vec3 cyan     = vec3(0.0,  0.85, 1.0);
    vec3 white    = vec3(0.85, 0.97, 1.0);

    vec3 col      = mix(sapphire, cyan,  dots * 0.75);
    col           = mix(col,      cyan,  glow * 0.5);
    col           = mix(col,      white, glow * glow * 0.6);

    float alpha   = (glow * 0.6 + dots * glow * 0.4) * fade * 0.85;

    gl_FragColor  = vec4(col, alpha);
  }
`;

// ─── FLOOR STREAKS (horizontal lines rushing from horizon to camera) ─────────
const floorVert = `
  varying vec2  vUv;
  attribute float aIndex;
  attribute float aSpeed;
  uniform float   uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t     = aIndex / ${FLOOR_COUNT}.0;              // 0..1
    float side  = sign(t - 0.5) * (abs(t - 0.5) * 2.0);

    // Spread lines horizontally
    pos.x      += side * 5.5;

    // Perspective z-scroll: lines appear to rush toward viewer
    float scroll = mod(uTime * aSpeed + aIndex * 0.17, 12.0);
    pos.z       += scroll;

    vUv.y = 1.0 - scroll / 12.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const floorFrag = `
  varying vec2  vUv;
  uniform float uTime;

  void main() {
    float fade  = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
    float glow  = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 6.0);

    vec3 cyan   = vec3(0.0, 0.82, 1.0);
    vec3 teal   = vec3(0.0, 1.0,  0.88);
    vec3 col    = mix(cyan, teal, glow);

    float alpha = glow * fade * 0.55;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ─── HORIZON ARC LINES ───────────────────────────────────────────────────────
const horizonVert = `
  varying vec2  vUv;
  attribute float aIndex;
  uniform float   uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t    = aIndex / ${HORIZON_COUNT}.0 - 0.5;
    pos.x     += t * 8.0;
    pos.y     += sin(pos.x * 0.4 + uTime * 0.5) * 0.06;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const horizonFrag = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    float glow  = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 4.0);
    float fade  = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.5, vUv.y);

    vec3 col    = vec3(0.05, 0.6, 1.0);
    float alpha = glow * fade * 0.4;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ─── MESH COMPONENTS ─────────────────────────────────────────────────────────

function RisingStrands() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const { aIndex, aOffset } = useMemo(() => {
    const aIndex  = new Float32Array(RISING_COUNT);
    const aOffset = new Float32Array(RISING_COUNT);
    for (let i = 0; i < RISING_COUNT; i++) {
      aIndex[i]  = i;
      aOffset[i] = Math.random() * Math.PI * 2;
    }
    return { aIndex, aOffset };
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < RISING_COUNT; i++) {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.25) * 0.06;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, RISING_COUNT]}>
      <planeGeometry args={[0.08, 14, 1, 80]}>
        <instancedBufferAttribute attach="attributes-aIndex"  args={[aIndex,  1]} />
        <instancedBufferAttribute attach="attributes-aOffset" args={[aOffset, 1]} />
      </planeGeometry>
      <shaderMaterial
        vertexShader={risingVert}
        fragmentShader={risingFrag}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function FloorStreaks() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const { aIndex, aSpeed } = useMemo(() => {
    const aIndex = new Float32Array(FLOOR_COUNT);
    const aSpeed = new Float32Array(FLOOR_COUNT);
    for (let i = 0; i < FLOOR_COUNT; i++) {
      aIndex[i] = i;
      aSpeed[i] = 0.8 + Math.random() * 0.9;
    }
    return { aIndex, aSpeed };
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < FLOOR_COUNT; i++) {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FLOOR_COUNT]}>
      <planeGeometry args={[0.04, 12, 1, 2]} />
      <instancedBufferAttribute attach="attributes-aIndex" args={[aIndex, 1]} />
      <instancedBufferAttribute attach="attributes-aSpeed" args={[aSpeed, 1]} />
      <shaderMaterial
        vertexShader={floorVert}
        fragmentShader={floorFrag}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function HorizonLines() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const aIndex = useMemo(() => {
    const arr = new Float32Array(HORIZON_COUNT);
    for (let i = 0; i < HORIZON_COUNT; i++) arr[i] = i;
    return arr;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < HORIZON_COUNT; i++) {
      dummy.position.set(0, 0, -8);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, HORIZON_COUNT]}>
      <planeGeometry args={[0.03, 16, 1, 2]}>
        <instancedBufferAttribute attach="attributes-aIndex" args={[aIndex, 1]} />
      </planeGeometry>
      <shaderMaterial
        vertexShader={horizonVert}
        fragmentShader={horizonFrag}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ─── SCENE WRAPPER ────────────────────────────────────────────────────────────

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle subtle sway
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.04;
    groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* Floor plane tilted flat — runs from horizon into camera */}
      <group rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.5, 2]}>
        <FloorStreaks />
      </group>

      {/* Horizon arc lines at the convergence point */}
      <group position={[0, -0.5, -6]} rotation={[0, 0, 0]}>
        <HorizonLines />
      </group>

      {/* Rising strands: start at convergence, rise upward and fan out */}
      {/* Tilted slightly back so bottom is "in screen", top comes toward viewer */}
      <group position={[0, -1, 0]} rotation={[0.18, 0, 0]}>
        <RisingStrands />
      </group>
    </group>
  );
}

// ─── EXPORTED COMPONENT ──────────────────────────────────────────────────────

export default function EnergyStreams3D() {
  return (
    <div
      className="w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        {/*
          Camera:
          - Positioned above and slightly in front
          - Looking DOWN toward the convergence/vanishing point
          - This creates the "lines burst from depth, rise up" perspective
        */}
        <PerspectiveCamera
          makeDefault
          position={[0, 2.5, 9]}
          fov={52}
          near={0.1}
          far={100}
          rotation={[-0.22, 0, 0]}
        />
        <Scene />
      </Canvas>
    </div>
  );
}