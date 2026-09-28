import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiVolume2, FiVolumeX } from "react-icons/fi";
import { asset } from "../utils/asset";

// Browsers reject play() when audio is not allowed yet; callers decide what to
// do with the refusal instead of letting it surface as an unhandled rejection.
const attemptPlay = async (video) => {
  try {
    await video.play();
    return true;
  } catch {
    return false;
  }
};

const soundControllers = new Set();

const muteOthers = (self) => {
  soundControllers.forEach((controller) => {
    if (controller !== self) controller.mute();
  });
};

let hasInteracted = false;
let interactionRefCount = 0;

const handleFirstInteraction = () => {
  hasInteracted = true;
  window.removeEventListener("pointerdown", handleFirstInteraction);
  window.removeEventListener("keydown", handleFirstInteraction);
};

const trackFirstInteraction = () => {
  interactionRefCount += 1;
  if (hasInteracted || interactionRefCount > 1) return;
  window.addEventListener("pointerdown", handleFirstInteraction);
  window.addEventListener("keydown", handleFirstInteraction);
};

const releaseFirstInteraction = () => {
  interactionRefCount -= 1;
  if (interactionRefCount > 0 || hasInteracted) return;
  window.removeEventListener("pointerdown", handleFirstInteraction);
  window.removeEventListener("keydown", handleFirstInteraction);
};

const VideoPreview = ({ src, poster, title }) => {
  const videoRef = useRef(null);
  const controllerRef = useRef(null);
  const lockedRef = useRef(false);
  const hoverTimerRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const controller = {
      mute: () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        lockedRef.current = false;
        setSoundOn(false);
      },
    };
    controllerRef.current = controller;
    soundControllers.add(controller);
    return () => {
      soundControllers.delete(controller);
    };
  }, []);

  useEffect(() => {
    trackFirstInteraction();
    return releaseFirstInteraction;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reducedMotion) attemptPlay(video);
          return;
        }
        video.pause();
        video.muted = true;
        lockedRef.current = false;
        setSoundOn(false);
        setShowHint(false);
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) return;
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      lockedRef.current = false;
      setSoundOn(false);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimerRef.current), []);

  const mute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setSoundOn(false);
  };

  const unmute = async (restart) => {
    const video = videoRef.current;
    if (!video) return;
    muteOthers(controllerRef.current);
    video.muted = false;
    if (restart) video.currentTime = 0;
    if (await attemptPlay(video)) {
      setSoundOn(true);
      setShowHint(false);
      return;
    }
    video.muted = true;
    setSoundOn(false);
    setShowHint(true);
    attemptPlay(video);
  };

  const toggleSound = () => {
    if (soundOn) {
      lockedRef.current = false;
      mute();
      return;
    }
    lockedRef.current = true;
    unmute(true);
  };

  const handleMouseEnter = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (!hasInteracted) {
      setShowHint(true);
      return;
    }
    hoverTimerRef.current = window.setTimeout(() => unmute(false), 400);
  };

  const handleMouseLeave = () => {
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
    setShowHint(false);
    if (!lockedRef.current) mute();
  };

  return (
    <div
      className="w-full aspect-[2/1] overflow-hidden relative cursor-pointer"
      onClick={toggleSound}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={asset(src)}
        poster={asset(poster)}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} preview`}
        className="w-full h-full object-cover object-top"
      />

      {showHint && (
        <span className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-black-300/80 border border-line text-[11px] font-mono text-white-50">
          Click for sound
        </span>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleSound();
        }}
        aria-label={soundOn ? "Mute" : "Unmute"}
        aria-pressed={soundOn}
        className="absolute bottom-3 right-3 w-9 h-9 flex-center rounded-full bg-black-300/80 border border-line text-white-50 hover:border-lime transition-colors"
      >
        {soundOn ? (
          <FiVolume2 className="w-4 h-4" />
        ) : (
          <FiVolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const { title, img, video, description, focus, stacks, links } = project;
  const isLeo = img.endsWith(".svg");
  const number = String(index).padStart(2, "0");

  return (
    <div className="glow-card rounded-2xl bg-black-300 border border-line overflow-hidden h-full flex flex-col">
      {video ? (
        <VideoPreview src={video} poster={img} title={title} />
      ) : (
        <div
          className={`w-full aspect-[2/1] overflow-hidden ${
            isLeo ? "bg-olive-800" : ""
          }`}
        >
          <img
            src={asset(img)}
            alt={`${title} screenshot`}
            loading="lazy"
            className={`w-full h-full ${
              isLeo ? "object-contain" : "object-cover object-top"
            }`}
          />
        </div>
      )}

      <div className="relative p-6 flex flex-col gap-3 flex-1">
        <span className="absolute top-4 right-6 font-mono text-4xl font-bold text-white-50 opacity-10 select-none">
          {number}
        </span>

        <h3 className="text-white-50 text-xl font-bold pr-14">{title}</h3>

        <p className="text-sm text-muted">{description}</p>

        {focus && (
          <p className="text-sm text-blue-50 font-medium">Focus: {focus}</p>
        )}

        {stacks && stacks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {stacks.map((stack, i) => (
              <span
                key={i}
                className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-olive-800 border border-lime/30 text-blue-50 font-mono font-medium"
              >
                {stack}
              </span>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex items-center gap-5 mt-auto pt-3 border-t border-line">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white-50 opacity-80 hover:opacity-100 hover:text-lime transition-colors"
              >
                {link.label === "Code" ? (
                  <FaGithub className="w-4 h-4" />
                ) : (
                  <FiExternalLink className="w-4 h-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
