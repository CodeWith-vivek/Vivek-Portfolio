import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

// eslint's no-unused-vars doesn't see `motion` used via the dotted
// `<motion.div>` JSX form in this project's config, so bind it plainly.
const MotionDiv = motion.div;

// Brief splash while web fonts arrive. Counts towards 100 over roughly the
// longest it can stay up, then slides away when App unmounts it.
const Loader = memo(({ durationMs = 900 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3; // ease-out: quick start, settles near 100
      setProgress(Math.round(eased * 100));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [durationMs]);

  return (
    <MotionDiv
      className="loader-screen bg-black-100 w-screen h-dvh fixed top-0 left-0 z-[100] flex-center"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* CSS-animated logo instead of a 272 KB GIF. */}
      <img
        src="images/logo.webp"
        alt=""
        width="96"
        height="87"
        className="loader-logo"
      />
      <div className="text-white-50 font-bold text-7xl leading-none gradient-title absolute bottom-10 right-10">
        {progress}%
      </div>
    </MotionDiv>
  );
});

Loader.displayName = "Loader";

export default Loader;
