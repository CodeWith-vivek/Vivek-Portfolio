import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// The splash only covers the web-font swap; it never waits longer than this.
const MAX_LOADING_MS = 900;

const App = () => {
  const [showContent, setShowContent] = useState(false);

  // Hide the splash once fonts are ready (or at the cap). The page renders
  // underneath the whole time, so nothing waits on it to start loading.
  useEffect(() => {
    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setShowContent(true);
      }
    };
    const timer = setTimeout(reveal, MAX_LOADING_MS);
    document.fonts?.ready.then(reveal);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return undefined;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [showContent]);

  // Site-wide inertia scrolling, driven through GSAP's ticker so every
  // ScrollTrigger-based reveal stays in sync with Lenis's smoothed position.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Nav/sidebar links are plain <a href="#section">; route them through
    // Lenis so in-page jumps use the same smoothing as wheel/touch scroll.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (id.length < 2 || !document.querySelector(id)) return;
      e.preventDefault();
      lenis.scrollTo(id, { offset: 0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!showContent && <Loader durationMs={MAX_LOADING_MS} />}
      </AnimatePresence>

      <div className="bg-black-100">
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
