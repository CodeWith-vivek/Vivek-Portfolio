import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/ContactExperience";
import ContactForm from "../components/ContactForm";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; 

const Contact = () => {
  return (
    <section id="contact" className="flex-center md:p-0 px-5 relative">
      <div className="w-full h-full container md:my-40 my-20">
        <TitleHeader
          title="Contact Me"
          number="06"
          text="I'm always open to new opportunities and collaborations. Feel free to reach out!"
        />
        <div className="mt-20">
          <div className="grid grid-cols-12">
            <div className="md:col-span-5 col-span-12 md:order-none order-1 relative z-10">
           
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="flex flex-col gap-3">
                  <p className="flex items-center">
                    <FaEnvelope
                      className="mr-2 text-gray-600"
                      aria-hidden="true"
                    />
                    Email: vivekanandthanuja97.com
                  </p>
                  <p className="flex items-center">
                    <FaPhone
                      className="mr-2 text-gray-600"
                      aria-hidden="true"
                    />
                    Phone: +91 9207314028
                  </p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt
                      className="mr-2 text-gray-600"
                      aria-hidden="true"
                    />
                    Location: Ernakulam, Kochi, Kerala
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
            <div className="md:col-span-7 col-span-12">
              <div className="w-full md:h-full h-96 md:absolute top-0 md:left-60 left-0 md:m-0 -mt-32">
                <ContactExperience />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
