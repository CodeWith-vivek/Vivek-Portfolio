

import React, { useState, useEffect, Suspense } from "react";
import { useProgress } from "@react-three/drei";


import Hero from "./sections/Hero";
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Education from "./sections/Education";


import Footer from "./components/Footer";
import Loader from "./components/Loader";
import NavBar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Experiences from "./sections/Experiences";

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { progress, total } = useProgress();

 
  useEffect(() => {
 
    const minLoadingTime = 2000; 
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {

    if (progress === 100) {
      setInitialLoadComplete(true);
    }
  }, [progress]);

 
  useEffect(() => {
    if (initialLoadComplete) {
  
      const animationDuration = 1000; 
      const transitionTimer = setTimeout(() => {
        setShowContent(true);
      }, animationDuration);

      return () => clearTimeout(transitionTimer);
    }
  }, [initialLoadComplete]);


  useEffect(() => {
    if (!showContent) {

      const preloadImages = [
      
        "/images/hero-bg.jpg",
        "/images/about-bg.jpg",
      ];

      preloadImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [showContent]);

  return (
    <>
      {!showContent && <Loader />}

      <div className={`bg-black-100 ${!showContent ? "hidden" : ""}`}>
        <NavBar />
        <SideBar />

        <Suspense fallback={null}>
          <Hero />
        </Suspense>

        <About />
        <TechStack />
        <Experiences />
        <Projects />
       <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;