

import React, { Suspense, memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GradientSpheres from "../components/GradientSpheres";

const HeroExperience = React.lazy(() => import("../components/HeroExperience"));

const Hero = memo(() => {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        containerRef.current.querySelectorAll(".name-text"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        0.3
      );

      tl.fromTo(
        containerRef.current.querySelectorAll(".title-text"),
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        0.7
      );

      tl.fromTo(
        containerRef.current.querySelectorAll(".intro-text"),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      tl.fromTo(
        containerRef.current.querySelectorAll(".shape-img"),
        { rotate: -90, opacity: 0 },
        { rotate: 0, opacity: 1, duration: 1 },
        0.5
      );

      return () => tl.kill();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      className="w-screen h-dvh overflow-hidden relative text-white-50 md:p-0 px-5"
      ref={containerRef}
    >
      <div className="gradient-box w-full h-96 absolute bottom-0 left-0 z-20" />

      <div className="absolute inset-0 z-0">
        <GradientSpheres
          sphere1Class="gradient-sphere sphere-1"
          sphere2Class="gradient-sphere sphere-2"
        />
      </div>

      <div className="w-full h-full flex-center">
        <div className="container relative w-full h-full">
          <div className="md:mt-40 mt-20" ref={nameRef}>
            <p className="font md:text-2xl text-base intro-text">
              Hey, I&apos;m
            </p>
            <div className="overflow-hidden">
              <h1 className="font-bold md:text-9xl text-5xl name-text">
                VIVEK
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold md:text-9xl text-5xl ml-10 name-text">
                ANAND
              </h1>
            </div>
            <div className="relative z-50 mt-8 ml-2 max-[639px]:fixed max-[639px]:bottom-8 max-[639px]:left-4">
              <a
                href="/vivek-anand-cv.pdf"
                download
                className="cv-button relative text-base px-6 py-2 max-[639px]:text-[10px] max-[639px]:px-2 max-[639px]:py-1"
                style={{
                  zIndex: 9999,
                  pointerEvents: "auto",
                  cursor: "pointer",
                }}
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="absolute w-full z-30 bottom-20 right-0">
            <div className="flex justify-between items-end">
              <div className="flex flex-col items-center md:gap-5 gap-1">
                <p className="md:text-base text-xs">Explore</p>
                <img
                  src="images/arrowdown.svg"
                  alt="Arrow pointing down"
                  className="size-7 animate-bounce"
                />
              </div>

              <div className="flex flex-col items-end" ref={titleRef}>
                <img
                  src="/images/shape.svg"
                  alt="Decorative shape"
                  className="shape-img"
                />
                <div className="overflow-hidden">
                  <h1 className="font-bold lg:text-9xl md:text-7xl sm:text-6xl text-4xl title-text">
                    MERN STACK
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h1 className="font-bold md:text-9xl text-5xl title-text">
                    DEVELOPER
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute inset-0 z-10">
        <Suspense fallback={null}>
          <HeroExperience />
        </Suspense>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;