

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradientSpheres from "../components/GradientSpheres";
import TitleHeader from "../components/TitleHeader";

import { bentoSocialLinks } from "../constants";
import Tilt from "react-parallax-tilt";
import Cardy from "../components/Cardy";
import { useRef } from "react";
import { FiMapPin, FiCalendar, FiBriefcase, FiCode } from "react-icons/fi";


gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, text }) => (
  <div id="card" className="glow-card bg-black-300 rounded-2xl p-7 w-full h-full">
    <div className="flex flex-col h-full justify-center gap-2">
      <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
        {title}
      </h1>
      <p className="md:text-2xl max-w-96 animated-text">{text}</p>
    </div>
  </div>
);

const quickFacts = [
  { Icon: FiMapPin, label: "Location", value: "Kochi, Kerala" },
  { Icon: FiCalendar, label: "Experience", value: "2+ Years" },
  { Icon: FiBriefcase, label: "Status", value: "Open to freelance work" },
  { Icon: FiCode, label: "Projects", value: "8 Built" },
];

const QuickFact = (fact) => (
  <div className="glow-card flex items-center gap-4 rounded-2xl border border-line bg-black-300 p-5">
    <span className="flex-center w-11 h-11 rounded-xl bg-olive-800 shrink-0">
      <fact.Icon className="w-5 h-5 text-blue-50" />
    </span>
    <div>
      <p className="text-sm text-muted">{fact.label}</p>
      <p className="text-white-50 font-semibold">{fact.value}</p>
    </div>
  </div>
);

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
          text="Full Stack Developer building AI-powered products"
        />

        <div className="md:mt-20 mt-10">
          <div className="grid grid-cols-12 md:grid-rows-12 gap-5">
       
            <div className="md:col-span-7 col-span-12 row-span-5">
              <div className="glow-card bg-black-300 rounded-2xl p-7 w-full h-full">
                <img
                  src="images/flower.svg"
                  alt="flower"
                  className="md:w-20 w-10"
                />
                <div className="mt-5">
                  <Tilt>
                    <div className="relative group w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto transition-all duration-500">
                      <img
                        src="images/profile.webp"
                        alt="Vivek Anand"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-full border-4 border-transparent group-hover:border-lime group-hover:shadow-[0_0_24px_4px] group-hover:shadow-lime/40 transition-all duration-300"
                      />
                    </div>
                  </Tilt>
                  <h1 className="text-white-50 md:text-5xl text-3xl mt-5">
                    Vivek Anand
                  </h1>
                  <p className="md:text-2xl mt-2">
                    I build and deploy production web applications and
                    AI-powered systems with TypeScript, React, Next.js,
                    Node.js, PostgreSQL, and MongoDB. My work spans REST APIs,
                    authentication, RAG pipelines, hybrid and vector search,
                    LLM integration, and tool calling, from backend and
                    frontend through deployment and client handover. Coming
                    from a commerce background, I bring a practical,
                    business-first view to the products I ship.
                  </p>
                </div>
              </div>
            </div>

           
            <div className="md:col-span-5 col-span-12 row-span-5 ">
              <div className="bg-gradient-to-br from-olive-800 to-black-100 border border-line grid-bg rounded-2xl w-full h-full min-h-[400px] overflow-hidden relative">
                <div
                  ref={grid2Container}
                  className="flex items-center justify-center w-full h-[400px] md:h-[500px] relative"
                >
                  <p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white-50/15 font-bold z-0">
                    CODE IS CRAFT
                  </p>

                  <Cardy
                    style={{ rotate: "75deg", top: "30%", left: "20%" }}
                    text="RAG"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                    text="SOLID"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
                    text="LLM Agents"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                    text="PostgreSQL"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "20deg", top: "10%", left: "38%" }}
                    text="NEXT.JS"
                    containerRef={grid2Container}
                  />
                  <Cardy
                    style={{ rotate: "30deg", top: "70%", left: "70%" }}
                    image="images/html.png"
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

            <div id="card" className="col-span-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {quickFacts.map((fact) => (
                  <QuickFact key={fact.label} {...fact} />
                ))}
              </div>
            </div>


            <div className="md:col-span-6 col-span-12 row-span-3">
              <Card
                title="Development Approach"
                text="Clean, typed code, secure APIs, and guarded AI features, built to be reliable in production."
              />
            </div>

        
            <div className="md:col-span-4 col-span-12 row-span-4">
              <div className="glow-card bg-black-300 rounded-2xl p-7 w-full h-full flex flex-col justify-between">
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
                  <div className="glow-card bg-black-300 rounded-2xl p-7 w-full h-full group cursor-pointer">
                    <div className="flex justify-between items-center h-full">
                      <div className="flex items-center md:gap-5">
                        <img src={item.icon} alt="" loading="lazy" decoding="async" />
                        <h1 className="gradient-title md:text-3xl text-xl ms-5 font-medium">
                          {item.name}
                        </h1>
                      </div>
                      <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                        <img
                          src="images/arrowupright.svg"
                          alt="arrow-up"
                          loading="lazy"
                          decoding="async"
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

