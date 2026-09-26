import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientSpheres from "../components/GradientSpheres";
import EducationCard from "../components/EducationCard";
import TitleHeader from "../components/TitleHeader";
import { educationData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section id="education" className="flex-center relative md:p-0 px-5">
      <GradientSpheres
        sphere1Class="testimonial-gradient-sphere testimonial-sphere-1"
        sphere2Class="testimonial-gradient-sphere testimonial-sphere-2"
      />

      <div className="w-full h-full container relative z-10 md:my-40 my-20">
        <TitleHeader
          title="EDUCATION"
          number="05"
          text="A brief journey through my academic milestones"
        />
        <div className="mt-20">
          <div ref={gridRef} className="grid md:grid-cols-2 gap-5">
            {educationData.map((edu, index) => (
              <EducationCard key={index} education={edu} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
