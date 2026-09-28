import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import ProjectCard from "../components/ProjectCard";
import GradientSpheres from "../components/GradientSpheres";
import { featuredProjects, moreProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const featuredRef = useRef(null);
  const moreRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(featuredRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
        },
      });

      gsap.from(moreRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: moreRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: featuredRef }
  );

  return (
    <section className="w-full h-full flex-center relative" id="projects">
      <GradientSpheres
        sphere1Class="projects-gradient-sphere projects-sphere-1"
        sphere2Class="projects-gradient-sphere projects-sphere-2"
      />

      <div className="w-full md:my-40 my-20 relative z-10">
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="My PROJECTS"
            number="04"
            text="A collection of projects that highlight my problem-solving approach and growth as a developer."
          />

          <h2 className="text-white-50 font-bold md:text-3xl text-2xl uppercase mt-16 mb-6">
            Featured Projects
          </h2>
          <div
            ref={featuredRef}
            className="grid md:grid-cols-2 grid-cols-1 gap-6 items-stretch"
          >
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i + 1} />
            ))}
          </div>

          <h2 className="text-white-50 font-bold md:text-2xl text-xl uppercase mt-16 mb-6">
            More Projects
          </h2>
          <div
            ref={moreRef}
            className="grid md:grid-cols-2 grid-cols-1 gap-6 items-stretch"
          >
            {moreProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i + featuredProjects.length + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
