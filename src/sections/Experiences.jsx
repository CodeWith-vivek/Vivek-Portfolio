
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GradientSpheres from "../components/GradientSpheres";
const Experiences = () => {
  return (
    <section id="experience" className="flex-center md:p-0 px-5 relative">
      <div className="w-full h-full container md:my-40 my-20">
        <GradientSpheres
          sphere1Class="about-gradient-sphere about-sphere-1"
          sphere2Class="about-gradient-sphere about-sphere-2"
        />
        <TitleHeader
          title="Experiences"
          number="03"
          text="Growth through business and tech"
        />
        <Timeline data={experiences} />
      </div>
    </section>
  );
};

export default Experiences;
