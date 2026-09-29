import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../components/ContactForm";
import GradientSpheres from "../components/GradientSpheres";
import { bentoSocialLinks } from "../constants";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const socialIcons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
};

const Contact = () => {
  const headerRef = useRef(null);
  const columnsRef = useRef(null);

  const email = "vivekanandthanuja97@gmail.com";

  const connectLinks = [
    ...bentoSocialLinks.map((link) => ({
      name: link.name,
      href: link.href,
      Icon: socialIcons[link.name],
    })),
    { name: "Email", href: `mailto:${email}`, Icon: FaEnvelope },
  ];

  useGSAP(
    () => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      gsap.from(columnsRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: columnsRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: headerRef }
  );

  return (
    <section id="contact" className="flex-center md:p-0 px-5 relative">
      <GradientSpheres
        sphere1Class="testimonial-gradient-sphere testimonial-sphere-1"
        sphere2Class="testimonial-gradient-sphere testimonial-sphere-2"
      />
      <div className="w-full h-full container md:my-40 my-20 relative z-10">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <p className="font-mono uppercase tracking-[0.18em] text-sm font-semibold text-blue-50">
            Get in Touch
          </p>
          <h2 className="text-white-50 font-bold md:text-6xl text-4xl mt-3">
            Let's Work Together
          </h2>
          <p className="text-muted md:text-xl mt-5">
            Have a project in mind or want to chat? My inbox is always open.
          </p>
        </div>

        <div
          ref={columnsRef}
          className="mt-16 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] grid-cols-1 gap-10 items-start"
        >
          <div>
            <h3 className="text-white-50 text-xl font-bold mb-3">
              Connect with me
            </h3>
            <p className="text-muted text-sm mb-6">
              Whether it's a full-time role, a freelance project, or just a
              coffee chat — I'd love to hear from you.
            </p>
            <div className="flex flex-col gap-3">
              {connectLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name === "Email" ? undefined : "_blank"}
                  rel={
                    link.name === "Email" ? undefined : "noopener noreferrer"
                  }
                  className="glow-card flex items-center gap-4 rounded-xl border border-line bg-black-300 p-4"
                >
                  <span className="flex-center w-10 h-10 rounded-lg bg-olive-800">
                    <link.Icon className="w-4 h-4 text-white-50" />
                  </span>
                  <span className="text-white-50 font-medium">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
