
// import React from 'react'
// import { useGLTF } from '@react-three/drei'

// export function GamingLaptop(props) {
//   const { nodes, materials } = useGLTF('/models/gaming_laptop-transformed.glb')
//   return (
//     <group {...props} dispose={null}>
//       <mesh geometry={nodes.Object_4.geometry} material={materials.PaletteMaterial001} position={[-1.199, 0.096, 0]} rotation={[0, 0, -1.38]} />
//       <mesh geometry={nodes.Object_7.geometry} material={materials['Material.004']} position={[-1.199, 0.096, 0]} rotation={[0, 0, -1.38]} />
//       <mesh geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial002} position={[-1.199, 0.096, 0]} rotation={[0, 0, -1.38]} />
//       <mesh geometry={nodes.Object_14.geometry} material={materials['Material.009']} />
//       <mesh geometry={nodes.Object_16.geometry} material={materials['Material.010']} />
//     </group>
//   )
// }

// useGLTF.preload('/gaming_laptop-transformed.glb')

import React, { memo } from "react";
import { useGLTF } from "@react-three/drei";

const GamingLaptop = memo((props) => {
  const { nodes, materials } = useGLTF("/models/gaming_laptop-transformed.glb");

  const commonPosition = [-1.199, 0.096, 0];
  const commonRotation = [0, 0, -1.38];

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.PaletteMaterial001}
        position={commonPosition}
        rotation={commonRotation}
      />
      <mesh
        geometry={nodes.Object_7.geometry}
        material={materials["Material.004"]}
        position={commonPosition}
        rotation={commonRotation}
      />
      <mesh
        geometry={nodes.Object_10.geometry}
        material={materials.PaletteMaterial002}
        position={commonPosition}
        rotation={commonRotation}
      />
      <mesh
        geometry={nodes.Object_14.geometry}
        material={materials["Material.009"]}
      />
      <mesh
        geometry={nodes.Object_16.geometry}
        material={materials["Material.010"]}
      />
    </group>
  );
});

useGLTF.preload("/models/gaming_laptop-transformed.glb");

export { GamingLaptop };
