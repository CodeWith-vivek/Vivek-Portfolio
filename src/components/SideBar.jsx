import { useState } from "react";
import { navItems } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    if (isOpen) {
      tl.to(".side-bar-bg", {
        x: 0,
        opacity: 1,
        ease: "power2.inOut",
      });
      tl.to(
        ".side-bar-item",
        {
          opacity: 1,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        "<"
      );
    } else {
      tl.to(".side-bar-bg", {
        x: "100%",
        opacity: 0,
        ease: "power2.inOut",
      });
      tl.to(".side-bar-item", {
        opacity: 0,
      });
    }
  }, [isOpen]);

  const handleNavClick = () => {

    const tl = gsap.timeline();
    tl.to(".side-bar-bg", {
      x: "100%",
      opacity: 0,
      ease: "power2.inOut",
      duration: 0.6, 
    });
    tl.to(".side-bar-item", {
      opacity: 0,
      duration: 0.3,
    });


    setTimeout(() => {
      setIsOpen(false);
    }, 800); 
  };

  return (
    <div className="md:hidden block">
      <div className="fixed z-[100] top-7 right-5" onClick={toggleSideBar}>
        <img src="images/menu-icon.png" alt="menu" />
      </div>
      <div className="fixed z-[100] -translate-x-[100%] w-screen h-dvh side-bar-bg">
        <div className="flex justify-end m-5" onClick={toggleSideBar}>
          <img src="images/x.png" alt="close" />
        </div>
        <div className="mt-5 px-10">
          <div className="flex flex-col items-center gap-7">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="side-bar-item opacity-0 cursor-pointer hover:underline transition-all duration-700"
                onClick={handleNavClick}
              >
                <a
                  className="gradient-title text-2xl font-bold"
                  href={item.href}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-6 mb-10 mt-20">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-500 transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/your-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-blue-600 transition-colors duration-300" />
          </a>
          <a
            href="https://instagram.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-pink-500 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
