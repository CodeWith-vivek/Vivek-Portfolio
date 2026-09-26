import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechIcon from "../components/TechIcon";
import TitleHeader from "../components/TitleHeader";
import { iconsList, SkillsInfo } from "../constants";
import Tilt from "react-parallax-tilt";
import GradientSpheres from "../components/GradientSpheres";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: cardsRef }
  );

  return (
    <div className="w-full h-full">
      <section id={"skill"}
        className="w-full md:my-40 my-20 mb-0 custom-tech-section"
        aria-label="Technology Stack"
      >
        <div className="container mx-auto md:p-0 px-5">
          <GradientSpheres
            sphere1Class="about-gradient-sphere about-sphere-1"
            sphere2Class="about-gradient-sphere about-sphere-2"
          />
          <TitleHeader
            title="TECH STACK"
            number="02"
            text="My Go-To Tools for Crafting Solutions"
          />
        </div>
        <div ref={cardsRef} className="md:mt-20 mt-10 ml-20 mr-20  flex flex-wrap gap-1 lg:gap-5 py-10 justify-between">
          {SkillsInfo.map((category) => (
            <div
              key={category.title}
              className=" backdrop-blur-md px-6 sm:px-10 py-8 sm:py-6 mb-10 w-full sm:w-[48%] rounded-2xl border border-line bg-olive-900/60 hover:border-lime/50 transition-colors duration-300"
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-white-50 mb-4 text-center">
                {category.title}
              </h3>

              <Tilt
                tiltMaxAngleX={20}
                tiltMaxAngleY={20}
                perspective={1000}
                scale={1.05}
                transitionSpeed={1000}
                gyroscope={true}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-center space-x-2 bg-transparent border border-line rounded-3xl py-2 px-2 sm:py-2 sm:px-2 text-center min-h-12"
                    >
                      {skill.logo ? (
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          loading="lazy"
                          decoding="async"
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                      ) : skill.icon ? (
                        <skill.icon
                          aria-hidden="true"
                          className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white-50"
                        />
                      ) : null}
                      <span className="text-xs sm:text-sm text-muted">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Tilt>
            </div>
          ))}
        </div>

        <div className="md:mt-20 mt-10 relative overflow-hidden">
         
          <div className="tech-stack-gradient-left-box w-36 h-full absolute bottom-0 left-0 z-20"></div>

        
          <div className="tech-stack-gradient-right-box w-36 h-full absolute bottom-0 right-0 z-20"></div>

         
          <div className="marquee h-52">
            <div className="marquee-box flex items-center md:gap-12 gap-5 animate-marquee">
              {iconsList.concat(iconsList.slice(0, 10)).map((icon, index) => (
                <TechIcon key={index} icon={icon} />
              ))}
            </div>
          </div>
        </div>

     
      </section>
    </div>
  );
};

export default TechStack;
