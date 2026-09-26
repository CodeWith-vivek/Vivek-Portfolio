const EducationCard = ({ education }) => {
  return (
    <div className="col-span-1 group p-8 mr-6 rounded-xl border border-line transition-colors duration-700 bg-black-300 hover:bg-olive-800 hover:border-lime/60">
      <div className="rounded-xl transition-all duration-700">
        <div className="flex justify-between items-center">
          <h1 className="text-white-50 text-xl font-semibold transition-all duration-700">
            {education.institution}
          </h1>
          <p className="text-sm font-mono text-muted font-light group-hover:text-white-50">
            {education.years}
          </p>
        </div>

        <p className="mt-3 text-base font-medium group-hover:text-white-50 transition-all duration-700">
          {education.degree}
        </p>

        <p className="mt-2 text-sm opacity-70 font-light group-hover:text-white-50 transition-all duration-700">
          {education.description}
        </p>
      </div>
    </div>
  );
};

export default EducationCard;
