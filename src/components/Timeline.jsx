"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    });

    if (ref.current) resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const dotPositions = data.map((_, index) => (index + 0.5) / data.length); 

  return (
    <div
      className="c-space section-spacing min-h-screen flex flex-col items-center justify-center"
      ref={containerRef}
    >
  

      <div ref={ref} className="relative pb-20 w-full max-w-6xl mx-auto">
        {data.map((item, index) => {
          const dotGlowOpacity = useTransform(
            scrollYProgress,
            [
              dotPositions[index] - 0.1,
              dotPositions[index],
              dotPositions[index] + 0.1,
            ],
            [0, 1, 0]
          );
          const dotGlowScale = useTransform(
            scrollYProgress,
            [
              dotPositions[index] - 0.1,
              dotPositions[index],
              dotPositions[index] + 0.1,
            ],
            [1, 1.5, 1]
          );

          return (

            <div
              key={index}
              className="flex flex-col md:flex-row justify-start pt-10 md:pt-40 gap-10 relative"
            >
    
              <div className="sticky z-40 flex flex-col items-center self-start top-40 md:w-1/3">
                <motion.div
                  className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px]"
                  style={{
           
                    scale: dotGlowScale,
                    boxShadow: useTransform(
                      dotGlowOpacity,
                      (value) =>
                        `0 0 ${value * 10}px ${value * 5}px rgba(59, 130, 246, ${value})`
                    ),
                    background: useTransform(
                      dotGlowOpacity,
                      (value) =>
                        `radial-gradient(circle, rgba(59, 130, 246, ${value}) 30%, rgb(38, 38, 38) 70%)`
                    ),
                  }}
                >
                  <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
                </motion.div>
                <div className="hidden md:flex flex-col gap-2 text-xl font-bold text-neutral-300 pl-10">
                  <h3>{item.date}</h3>
                  <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                  <h3 className="text-3xl text-neutral-500">{item.job}</h3>
                </div>
              </div>

       
              <div className="relative w-full pl-20 pr-4 md:pl-4 md:w-2/3">
                <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden">
                  <h3>{item.date}</h3>
                  <h3>{item.job}</h3>
                </div>
                {item.contents.map((content, i) => (
                  <p className="mb-3 font-normal text-neutral-400" key={i}>
                    {content}
                  </p>
                ))}
              </div>
            </div>
          );
        })}

  
        <div
          style={{ height: `${height}px` }}
          className="absolute left-[16px] top-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] overflow-hidden"
        >
  
          <motion.div
            style={{
              y: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
          >
          
            <div className="w-2 h-8 bg-gradient-to-b from-white via-cyan-400 to-blue-500 rounded-full blur-sm opacity-90" />

          
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-cyan-300 via-blue-400 to-purple-500 rounded-full blur-md opacity-60" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-16 bg-gradient-to-b from-cyan-200 via-blue-300 to-purple-400 rounded-full blur-lg opacity-40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-gradient-to-b from-cyan-100 via-blue-200 to-purple-300 rounded-full blur-xl opacity-20" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-full opacity-100" />
          </motion.div>

    
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [-50, height - 50]),
              opacity: useTransform(
                scrollYProgress,
                [0, 0.1, 0.9, 1],
                [0, 0.8, 0.8, 0]
              ),
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent rounded-full blur-sm"
          />
        </div>
      </div>
    </div>
  );
};