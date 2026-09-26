import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import ContactForm from "../components/ContactForm";
import GradientSpheres from "../components/GradientSpheres";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const infoRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(infoRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: infoRef }
  );

  return (
    <section id="contact" className="flex-center md:p-0 px-5 relative">
      <GradientSpheres
        sphere1Class="testimonial-gradient-sphere testimonial-sphere-1"
        sphere2Class="testimonial-gradient-sphere testimonial-sphere-2"
      />
      <div className="w-full h-full container md:my-40 my-20 relative z-10">
        <TitleHeader
          title="Contact Me"
          number="06"
          text="I'm always open to new opportunities and collaborations. Feel free to reach out!"
        />
        <div className="mt-20">
          <div ref={infoRef} className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="flex flex-col gap-3">
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-muted" aria-hidden="true" />
                  Email: vivekanandthanuja97@gmail.com
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2 text-muted" aria-hidden="true" />
                  Phone: +91 9207314028
                </p>
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-muted" aria-hidden="true" />
                  Location: Kochi, Kerala, India
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
