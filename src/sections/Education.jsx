import GradientSpheres from "../components/GradientSpheres";
import EducationCard from "../components/EducationCard";
import TitleHeader from "../components/TitleHeader";
import { educationData } from "../constants";


const Education = () => {
  return (
    <section id="education" className="flex-center relative md:p-0 px-5">
      <GradientSpheres
        sphere1Class="testimonial-gradient-sphere testimonial-sphere-1"
        sphere2Class="testimonial-gradient-sphere testimonial-sphere-2"
      />

      <div className="w-full h-full container relative z-10 md:my-40 my-20">
        <TitleHeader
          title="EDUCATION"
          number="05"
          text="A brief journey through my academic milestones"
        />
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-5">
            {educationData.map((edu, index) => (
              <EducationCard key={index} education={edu} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
