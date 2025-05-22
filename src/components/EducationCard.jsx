const EducationCard = ({ education }) => {
  return (
    <div className="col-span-1 group p-8 mr-6 rounded-xl transition-all duration-700 bg-black-300 hover:bg-blue-300">
      <div className="rounded-xl transition-all duration-700">
        <div className="flex justify-between items-center">
          <h1 className="text-blue-50 text-xl font-semibold group-hover:text-white transition-all duration-700">
            {education.institution}
          </h1>
          <p className="text-sm text-white-50 font-light group-hover:text-white">
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
