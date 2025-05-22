
const TechIcon = ({ icon }) => {
  return (
    <div
      className="flex-none md:w-32 md:h-32 w-20 h-20 bg-black-300 flex-center gradient-border marquee-item transform transition-transform duration-700 will-change-transform hover:-translate-y-3"
      title={icon.name}
      role="img"
      aria-label={icon.name}
    >
      <img
        src={icon.image}
        alt={icon.name || "Technology Icon"}
        width={64}
        height={64}
        loading="lazy"
        className="md:size-16 size-10"
      />
    </div>
  );
};

export default TechIcon;

