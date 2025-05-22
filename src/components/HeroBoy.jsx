
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const HeroBoy = React.memo((props) => {
  const { scene, animations } = useGLTF("/models/boy-transformed.glb");
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clonedScene);

  const group = useRef();
  const headBone = useRef(null);
  const mouse = useRef(new THREE.Vector2());
  const lookTarget = useRef(new THREE.Vector3());
  const [isIntroAnimationDone, setIsIntroAnimationDone] = useState(false);
  const [lastMouseTime, setLastMouseTime] = useState(Date.now());
  const [isIdle, setIsIdle] = useState(false);

  const isMobile = useMemo(
    () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
    []
  );

  useMemo(() => {
    animations.forEach((clip) => {
      clip.tracks = clip.tracks.filter(
        (track) => !track.name.includes("Armature.quaternion")
      );
    });
  }, [animations]);


  useGSAP(() => {
    if (!isIntroAnimationDone && group.current) {
      gsap.fromTo(
        group.current.rotation,
        { y: Math.PI },
        {
          y: 0,
          delay: 0.5,
          duration: 1.5,
          ease: "expo.inOut",
          onComplete: () => setIsIntroAnimationDone(true),
        }
      );
    }
  }, [isIntroAnimationDone]);


  useEffect(() => {
    if (!group.current || !isIntroAnimationDone) return;

    const baseY = group.current.position.y;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(group.current.position, {
      y: baseY + 0.02,
      duration: 1.5,
      ease: "sine.inOut",
    });

    return () => tl.kill();
  }, [isIntroAnimationDone]);

  const handleMouseMove = useCallback((event) => {
    setLastMouseTime(Date.now());

    const { innerWidth, innerHeight } = window;
    mouse.current.set(
      (event.clientX / innerWidth) * 2 - 1,
      -(event.clientY / innerHeight) * 2 + 1
    );
  }, []);

  useEffect(() => {
    if (isIntroAnimationDone && !isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isIntroAnimationDone, handleMouseMove, isMobile]);

  useEffect(() => {
    if (group.current && !headBone.current) {
      headBone.current = group.current.getObjectByName("Head");
    }
  }, [isIntroAnimationDone]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setIsIdle(now - lastMouseTime > 4000);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastMouseTime]);

  useFrame(() => {
    if (!group.current || !headBone.current || !isIntroAnimationDone) return;

    let targetX = mouse.current.x;
    let targetY = mouse.current.y;

    if (isIdle) {
      const t = performance.now() * 0.001;
      targetX = Math.sin(t * 0.2) * 0.5;
      targetY = Math.cos(t * 0.1) * 0.2;
    }

    lookTarget.current.lerp(new THREE.Vector3(targetX, targetY, 1), 0.1);
    headBone.current.lookAt(lookTarget.current);

    if (!isMobile) {
      group.current.rotation.y +=
        (lookTarget.current.x * 0.5 - group.current.rotation.y) * 0.1;
    }
  });

  const morphTargetMeshes = useMemo(
    () => [
      { name: "EyeLeft", material: materials.Wolf3D_Eye },
      { name: "EyeRight", material: materials.Wolf3D_Eye },
      { name: "Wolf3D_Head", material: materials.Wolf3D_Skin },
      { name: "Wolf3D_Teeth", material: materials.Wolf3D_Teeth },
    ],
    [materials]
  );

  const dynamicSkinnedMeshes = useMemo(
    () => [
      "Wolf3D_Hair",
      "Wolf3D_Glasses",
      "Wolf3D_Outfit_Top",
      "Wolf3D_Outfit_Bottom",
      "Wolf3D_Outfit_Footwear",
      "Wolf3D_Body",
    ],
    []
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      {dynamicSkinnedMeshes.map((name) => (
        <skinnedMesh
          key={name}
          geometry={nodes[name].geometry}
          material={materials[name]}
          skeleton={nodes[name].skeleton}
        />
      ))}
      {morphTargetMeshes.map(({ name, material }) => {
        const node = nodes[name];
        return (
          <skinnedMesh
            key={name}
            name={name}
            geometry={node.geometry}
            material={material}
            skeleton={node.skeleton}
            morphTargetDictionary={node.morphTargetDictionary}
            morphTargetInfluences={node.morphTargetInfluences}
          />
        );
      })}
    </group>
  );
});

useGLTF.preload("/models/boy-transformed.glb");
