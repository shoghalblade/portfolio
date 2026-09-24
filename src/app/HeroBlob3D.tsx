"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPos;
uniform float uTime;
float n(vec3 p) {
  return sin(p.x*2.1+uTime)*cos(p.y*1.7-uTime*0.8)*sin(p.z*1.9+uTime*0.6);
}
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  float w = n(pos*1.5)*0.14 + n(pos*3.2)*0.06;
  pos += normal * w;
  vPos = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPos;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main() {
  float fres = pow(1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0))), 2.0);
  float bands = sin(vPos.y*14.0 + uTime*1.4)*0.5+0.5;
  float mixf = 0.5 + 0.5*sin(uTime*0.5 + vPos.x*3.0 + vPos.y*2.0);
  vec3 col = mix(uColorA, uColorB, mixf);
  col += bands * fres * 0.45;
  col += fres * 1.5;
  float alpha = fres*0.9 + 0.15;
  gl_FragColor = vec4(col, alpha);
}
`;

function Blob({ paused }: { paused: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#2563eb") },
      uColorB: { value: new THREE.Color("#a855f7") },
    }),
    []
  );
  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.18 + state.pointer.x * 0.35;
      mesh.current.rotation.x = Math.sin(t * 0.25) * 0.25 + state.pointer.y * 0.2;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.25;
      inner.current.rotation.z = t * 0.1;
    }
  });
  return (
    <group>
      <mesh ref={mesh} scale={1.5}>
        <icosahedronGeometry args={[1, 24]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
      <mesh ref={inner} scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial wireframe color="#7c3aed" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Particles({ count = 350, paused }: { count?: number; paused: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++)
      arr[i] = (Math.random() - 0.5) * 14;
    return arr;
  }, [count]);
  useFrame((state) => {
    if (paused) return;
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = state.clock.elapsedTime * 0.012;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export default function HeroBlob3D() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Stop the render loop once the hero scrolls off-screen — keeps scroll buttery
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  // If user prefers reduced motion, skip the 3D canvas entirely
  if (!mounted || reducedMotion) return null;

  return (
    <div ref={wrap} className="h-full w-full">
    <Canvas
      dpr={[1, 2]}
      frameloop={inView ? "always" : "never"}
      gl={{ powerPreference: "high-performance", antialias: false }}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <Blob paused={false} />
      <Particles paused={false} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.85} intensity={1.6} height={300} />
        <ChromaticAberration offset={[0.0012, 0.0012]} />
        <Vignette eskil={false} offset={0.12} darkness={1.15} />
      </EffectComposer>
    </Canvas>
    </div>
  );
}
