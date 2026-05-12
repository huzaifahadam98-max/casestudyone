"use client";

import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Sky, Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Bicycle from './Bicycle';
import Terrain from './Terrain';
import { Suspense, useEffect, useState } from 'react';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
];

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-full h-[600px] md:h-[800px] bg-sky-100 flex items-center justify-center">Loading 3D Environment...</div>;
  }

  return (
    <div className="w-full h-[600px] md:h-[800px] relative bg-sky-100 cursor-grab active:cursor-grabbing">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 p-4 bg-white/80 backdrop-blur rounded-xl text-center shadow-lg pointer-events-none fade-in-up is-visible">
         <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Trading Spreadsheets for Soil</h1>
         <p className="text-slate-600 text-sm md:text-base hidden md:block">Use WASD or Arrows to explore the hybrid farm.</p>
         <p className="text-slate-600 text-sm md:hidden">Scroll down to continue.</p>
      </div>

      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
          <Suspense fallback={null}>
             <Sky sunPosition={[100, 20, 100]} />
             <ambientLight intensity={0.5} />
             <directionalLight castShadow position={[10, 20, 10]} intensity={1.5} shadow-mapSize={[1024, 1024]} />
             
             <Physics>
               <Bicycle />
               <Terrain />
             </Physics>

             <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
