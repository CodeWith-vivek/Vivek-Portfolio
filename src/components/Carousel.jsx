

import { useState, useEffect, useRef } from "react";
import { slides } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaCaretLeft, FaCaretRight, FaGithub } from "react-icons/fa";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerHeight, setContainerHeight] = useState("60vh"); 
  const imageRefs = useRef([]); 

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + (slides.length - 1)) % (slides.length - 1)
    );
  };

  
  useEffect(() => {
    const updateHeight = () => {
      const img = imageRefs.current[currentSlide];
      if (img && img.naturalWidth && img.naturalHeight) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const slideWidthPx = window.innerWidth * 0.6; 
        const imageHeightPx = slideWidthPx / aspectRatio; 
        const totalHeightPx = imageHeightPx + 150; 
        setContainerHeight(`${totalHeightPx}px`); 
      } else {
        setContainerHeight("60vh"); 
      }
    };

    
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [currentSlide]);

  useGSAP(() => {
    gsap.to(".slider-item", {
      x: `-${currentSlide * 63}vw`,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
    });

    gsap.fromTo(
      `.slider-item:nth-child(${currentSlide + 2}) img`,
      { scale: 2 },
      { scale: 1, duration: 1, ease: "power2.out" }
    );
  }, [currentSlide]);

  return (
    <div className="relative">
      <div className="w-full relative" style={{ height: containerHeight }}>
        <div className="carousel-gradient-left-box md:w-52 w-16 h-full absolute bottom-0 left-0 z-20"></div>
        <div className="carousel-gradient-right-box md:w-52 w-16 h-full absolute bottom-0 right-0 z-20"></div>

        <div className="absolute w-full -left-[43vw] top-0">
          <div
            className="flex w-full items-center gap-[3vw]"
            style={{ height: containerHeight }}
          >
            {slides.map((slide, index) => (
              <div
                className="slider-item w-[60vw] h-full flex-none relative overflow-hidden bg-black"
                key={index}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-[calc(100%-150px)] object-contain object-center absolute top-0 left-0"
                  ref={(el) => (imageRefs.current[index] = el)}
                  onLoad={() => {
                    if (index === currentSlide) {
                      const img = imageRefs.current[index];
                      if (img && img.naturalWidth && img.naturalHeight) {
                        const aspectRatio =
                          img.naturalWidth / img.naturalHeight;
                        const slideWidthPx = window.innerWidth * 0.6;
                        const imageHeightPx = slideWidthPx / aspectRatio;
                        setContainerHeight(`${imageHeightPx + 150}px`);
                      }
                    }
                  }}
                />

                <div className="absolute w-full bottom-0 left-0 bg-black-300 bg-opacity-90 px-4 py-2 space-y-1 h-[150px]">
                  <div className="flex flex-col justify-center gap-1">
                    <div className="flex items-center gap-2">
                      <p className="md:text-xl text-lg text-white-50 opacity-80 mt-2">
                        {index + 1}.
                      </p>
                      <p className="md:text-xl text-lg text-white-50 opacity-80 truncate mt-2">
                        {slide.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {slide.preview && (
                        <a
                          href={slide.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] md:text-xs text-white-50 hover:underline mt-2"
                        >
                          Preview
                        </a>
                      )}
                      {slide.github && (
                        <a
                          href={slide.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white-50 opacity-80 hover:opacity-70 mt-2"
                        >
                          <FaGithub className="md:w-4 md:h-4 w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {slide.description && (
                      <p className="text-xs text-white-50 opacity-70 mt-1 md:w-[35vw] w-[50vw] line-clamp-2 mt-2">
                        {slide.description}
                      </p>
                    )}

                    {slide.stacks && slide.stacks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 mb-2">
                        {slide.stacks.map((stack, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-black-100 font-medium"
                          >
                            {stack}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-white-50 flex justify-end gap-5 md:-translate-x-32 -translate-x-5">
        <div
          onClick={prevSlide}
          className="rounded-full cursor-pointer bg-blue-50 hover:bg-red-100 active:scale-90 transition-all w-12 h-12 flex-center"
        >
          <FaCaretLeft className="w-5 h-5 text-white-50" />
        </div>
        <div
          onClick={nextSlide}
          className="rounded-full cursor-pointer bg-blue-50 hover:bg-red-100 active:scale-90 transition-all w-12 h-12 flex-center"
        >
          <FaCaretRight className="w-5 h-5 text-white-50" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;