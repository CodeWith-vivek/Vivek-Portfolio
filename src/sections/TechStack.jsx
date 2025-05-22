import TechIcon from "../components/TechIcon";
import TitleHeader from "../components/TitleHeader";
import { iconsList, SkillsInfo } from "../constants";
import Tilt from "react-parallax-tilt";
import GradientSpheres from "../components/GradientSpheres";

const TechStack = () => {
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
        <div className="md:mt-20 mt-10 ml-20 mr-20  flex flex-wrap gap-1 lg:gap-5 py-10 justify-between">
          {SkillsInfo.map((category) => (
            <div
              key={category.title}
              className=" backdrop-blur-md px-6 sm:px-10 py-8 sm:py-6 mb-10 w-full sm:w-[48%] rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
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
                      className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-2 sm:py-2 sm:px-2 text-center"
                    >
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                      <span className="text-xs sm:text-sm text-gray-300">
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
