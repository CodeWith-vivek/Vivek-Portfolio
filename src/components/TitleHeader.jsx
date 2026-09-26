import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TitleHeader = ({ title, number, text }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex justify-between items-center">
      <div>
        <h1 className="text-white-50 font-bold md:text-6xl text-4xl uppercase">
          {title}
        </h1>
        <p className="md:text-3xl md:mt-5">{text}</p>
      </div>
      <div className="items-center gap-7 hidden md:flex">
        <div className="w-36 border-t border-line"></div>
        <p className="font-mono text-blue-50 text-5xl">{number}</p>
      </div>
    </div>
  );
};

export default TitleHeader;
