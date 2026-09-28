import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { asset } from "../utils/asset";

const ProjectCard = ({ project, index }) => {
  const { title, img, description, focus, stacks, links } = project;
  const isLeo = img.endsWith(".svg");
  const number = String(index).padStart(2, "0");

  return (
    <div className="glow-card rounded-2xl bg-black-300 border border-line overflow-hidden h-full flex flex-col">
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
            isLeo
              ? "object-contain"
              : "object-cover object-top"
          }`}
        />
      </div>

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
