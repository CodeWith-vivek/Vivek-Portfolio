


import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { HeroBoy } from "./HeroBoy";

const HeroExperience = () => {
  return (
    <Canvas>
    
      <ambientLight />
      <directionalLight position={[-2, 0, 3]} intensity={3} color="#FF28D5" />
      <directionalLight position={[2, 0, 3]} intensity={3} color="#1C34FF" />

    
      <Sparkles
        count={150}
        size={2}
        speed={0.5}
        color="white"
        scale={[10, 10, 2]}
      />

    
      <Suspense fallback={null}>
        <group>
          <HeroBoy scale={9} position={[0, -15, 0]} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
