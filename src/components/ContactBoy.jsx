

import React, { useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";


const MODEL_PATH = "/models/boy-transformed.glb";
const ANIMATION_PATH = "/models/Wave Hip Hop Dance.fbx";
const ANIMATION_NAME = "Dance";

const ContactBoy = React.memo(function ContactBoy(props) {
  const group = useRef();


  const { scene } = useGLTF(MODEL_PATH);

  
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

 
  const { nodes, materials } = useGraph(clone);


  const fbx = useFBX(ANIMATION_PATH);
  const animations = useMemo(() => {
    if (!fbx.animations?.length) return [];

    const clip = fbx.animations[0].clone();
    clip.name = ANIMATION_NAME;
    clip.tracks = clip.tracks.filter(
      (track) => !track.name.includes("Armature")
    );
    return [clip];
  }, [fbx.animations]);


  const { actions } = useAnimations(animations, group);


  useEffect(() => {
    const action = actions[ANIMATION_NAME];
    if (action) action.play();

    return () => {
      if (action) action.stop();
    };
  }, [actions]);


  useEffect(() => {
    return () => {
      clone.traverse((child) => {
        if (!child.isMesh) return;

        child.geometry.dispose();

        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else if (child.material) {
          child.material.dispose();
        }
      });
    };
  }, [clone]);

  const meshes = useMemo(
    () => (
      <>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </>
    ),
    [nodes, materials]
  );

  return (
    <group ref={group} {...props} dispose={null}>
      {meshes}
    </group>
  );
});


useGLTF.preload(MODEL_PATH);
export { ContactBoy };