import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import React, { useEffect, useRef, useMemo, memo } from "react";


const ANIMATION_CONFIG = Object.freeze({
  y: "-100%",
  duration: 1,
  ease: "power2.inOut",
});

const Loader = memo(() => {
 
  const { progress, total } = useProgress();


  const loaderRef = useRef(null);

 
  const progressValue = useMemo(() => Math.floor(progress), [progress]);

 
  useGSAP(() => {

    if (total === 20 && progress === 100 && loaderRef.current) {
      gsap.to(loaderRef.current, ANIMATION_CONFIG);
    }
  }, [progress, total]); 

  useEffect(() => {
    return () => {

      if (loaderRef.current) {
        gsap.killTweensOf(loaderRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="loader-screen bg-black-100 w-screen h-dvh fixed top-0 left-0 z-[100] flex-center"
    >
      <div className="flex-center w-full h-full">
        <img
          src="/images/loader.gif"
          alt="Loading animation"
          loading="eager" 
          width="200" 
          height="200" 
        />
      </div>
      <div className="text-white-50 font-bold text-7xl leading-none gradient-title absolute bottom-10 right-10">
        {progressValue}%
      </div>
    </div>
  );
});

Loader.displayName = "Loader";

export default Loader;
