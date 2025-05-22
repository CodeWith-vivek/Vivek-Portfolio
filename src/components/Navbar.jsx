import { useEffect, useState } from "react";
import { navItems } from "../constants";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full fixed z-50 top-0 left-0 md:p-0 px-5">
    
      {scrolled && (
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <div
            className="w-full h-full backdrop-blur-md bg-gradient-to-b from-black/70 via-black/50 to-transparent"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 55%, transparent 100%)",
            }}
          ></div>
        </div>
      )}

      <div className="container md:my-10 my-5 flex items-center justify-between">
        <img
          src="/images/logo.webp"
          alt="logo"
          className="md:size-12 size-10 object-cover object-center ml-8"
        />
        <div className="md:flex items-center gap-7 hidden">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px]
              after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left
              hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
            >
              <a className="gradient-title text-lg" href={item.href}>
                {item.name}
              </a>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4 mr-8">
          <a
            href="https://github.com/CodeWith-vivek"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-500 transition-colors duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/vivek-anand-453bba17a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-blue-600 transition-colors duration-300" />
          </a>
          <a
            href="https://www.instagram.com/__v_i_v_e_k_._a_n_a_n_d?igsh=MWhkMmluaHM0dHduMQ=="
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

export default NavBar;
