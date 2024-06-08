import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { TextureLoader } from 'three';

// Shader material for the sketch effect
const SketchMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.2, 0.2) },
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  `uniform float time;
  uniform vec3 color;
  varying vec2 vUv;
  void main() {
    float sketch = sin(vUv.x * 40.0) * cos(vUv.y * 40.0);
    gl_FragColor = vec4(color * (0.5 + 0.5 * sketch), 1.0);
  }`
);

extend({ SketchMaterial });

function Block({ position }) {
  const mesh = useRef();
  const [hovered, setHovered] = React.useState(false);

  // Randomize the initial glimmer phase
  const phase = React.useMemo(() => Math.random() * Math.PI * 2, []);

  // Animate the block
  useFrame((state) => {
    mesh.current.material.uniforms.time.value = state.clock.elapsedTime + phase;
    mesh.current.scale.setScalar(hovered ? 1.5 : 1);
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <sketchMaterial color="orange" />
    </mesh>
  );
}

function ServerBlocks() {
  // Generate random positions for the blocks
  const positions = React.useMemo(() => {
    const pos = [];
    for (let i = 0; i < 50; i++) {
      pos.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]);
    }
    return pos;
  }, []);

  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} castShadow />
      <Suspense fallback={null}>
        {positions.map((pos, index) => (
          <Block key={index} position={pos} />
        ))}
      </Suspense>
      <EffectComposer>
        <Outline blendFunction={BlendFunction.SCREEN} edgeStrength={1.0} />
      </EffectComposer>
    </Canvas>
  );
}

export default ServerBlocks;
