

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradientSpheres from "../components/GradientSpheres";
import TitleHeader from "../components/TitleHeader";

import { bentoSocialLinks } from "../constants";
import Tilt from "react-parallax-tilt";
import Cardy from "../components/Cardy";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const grid2Container = useRef();
  useGSAP(() => {
    gsap.from("#card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
      },
    });

    gsap.from(".animated-text", {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
      },
    });
  }, []);

  const Card = ({ title, text }) => (
    <div id="card" className="bg-black-300 rounded-2xl p-7 w-full h-full">
      <div className="flex flex-col h-full justify-center gap-2">
        <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
          {title}
        </h1>
        <p className="md:text-2xl max-w-96 animated-text">{text}</p>
      </div>
    </div>
  );

  return (
    <section id="about" className="flex-center relative md:p-0 px-5">
      <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      />

      <div className="container w-full h-full md:my-40 my-20 relative z-10">
        <TitleHeader
          title="About Me"
          number="01"
          text="Passionate Creator, Lifelong Learner"
        />

        <div className="md:mt-20 mt-10">
          <div className="grid grid-cols-12 md:grid-rows-12 gap-5">
       
            <div className="md:col-span-7 col-span-12 row-span-5">
              <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                <img
                  src="/images/flower.svg"
                  alt="flower"
                  className="md:w-20 w-10"
                />
                <div className="mt-5">
                  <Tilt>
                    <div className="relative group w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto transition-all duration-500">
                      <img
                        src="/images/profile.webp"
                        alt="Vivek Anand"
                        className="w-full h-full object-cover rounded-full border-4 border-transparent group-hover:border-blue-500 group-hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.8)] transition-all duration-300"
                      />
                    </div>
                  </Tilt>
                  <h1 className="text-blue-50 md:text-5xl text-3xl mt-5">
                    Vivek Anand
                  </h1>
                  <p className="md:text-2xl mt-2">
                    I’m a MERN stack developer, with a passion for building
                    full-stack web applications. Coming from a non-IT
                    background, I’ve transitioned into tech and successfully
                    delivered both major and mini projects across various
                    domains. My journey reflects adaptability, a strong learning
                    mindset, and a commitment to solving real-world problems
                    through code.
                  </p>
                </div>
              </div>
            </div>

           
            <div className="md:col-span-5 col-span-12 row-span-5 ">
              <div className="bg-gradient-to-r from-[#3F5EFB] to-[#FC4646] rounded-2xl w-full h-full min-h-[400px] overflow-hidden relative">
                <div
                  ref={grid2Container}
                  className="flex items-center justify-center w-full h-[400px] md:h-[500px] relative"
                >
                  <p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white font-semibold z-0">
                    CODE IS CRAFT
                  </p>

                  <Cardy
                    style={{ rotate: "75deg", top: "30%", left: "20%" }}
                    text="MONGODB"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                    text="SOLID"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
                    text="Design Patterns"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                    text="Design Principles"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "20deg", top: "10%", left: "38%" }}
                    text="REACT"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "30deg", top: "70%", left: "70%" }}
                    image="/images/html.png"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "-45deg", top: "70%", left: "25%" }}
                    image="images/js.png"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "-45deg", top: "5%", left: "10%" }}
                    image="images/css.png"
                    containerRef={grid2Container}
                  />
                </div>
              </div>
            </div>

          
            <div className="md:col-span-6 col-span-12 row-span-3">
              <Card
                title="Development Approach"
                text="Focused on clean code, performance, security, and user-first design for scalable, reliable apps."
              />
            </div>

        
            <div className="md:col-span-4 col-span-12 row-span-4">
              <div className="bg-black-300 rounded-2xl p-7 w-full h-full flex flex-col justify-between">
                {["BE YOURSELF!", "BE DIFFERENT!", "BUILD DIFFERENT!"].map(
                  (line, idx) => (
                    <h1
                      key={idx}
                      className="gradient-title md:text-5xl text-3xl font-bold"
                    >
                      {line}
                    </h1>
                  )
                )}
              </div>
            </div>

     
            {bentoSocialLinks.map((item, index) => (
              <div key={index} className="md:col-span-4 col-span-12 row-span-2">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <div className="bg-black-300 rounded-2xl p-7 w-full h-full group cursor-pointer">
                    <div className="flex justify-between items-center h-full">
                      <div className="flex items-center md:gap-5">
                        <img src={item.icon} alt={item.name} />
                        <h1 className="gradient-title md:text-3xl text-xl ms-5 font-medium">
                          {item.name}
                        </h1>
                      </div>
                      <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                        <img
                          src="/images/arrowupright.svg"
                          alt="arrow-up"
                          className="md:scale-100 scale-50"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

