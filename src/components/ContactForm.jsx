import { useForm } from "react-hook-form";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const contactFormSchema = Z.object({
  name: Z.string().nonempty("Name is required"),
  email: Z.string().email("Invalid email").nonempty("Email is required"),
  subject: Z.string().nonempty("Subject is required"),
  message: Z.string().nonempty("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
    resolver: zodResolver(contactFormSchema),
  });

  const submittedRef = useRef(false);
  const formRef = useRef(null);

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby-j1zZG-XID0Puk7W_EjY_7ylBgtg-FqI7DbyWEmQlZ9qp7pwvqq33wBLpwekRnyi4/exec";

  const onSubmit = () => {
    try {
      setIsSubmitting(true);
      const values = getValues();
      const query = new URLSearchParams(values).toString();

     
      console.log("Form values:", values);
      console.log("Query string:", query);

      submittedRef.current = true;

      const form = formRef.current;
      if (form) {
        const fullUrl = `${SCRIPT_URL}?${query}`;
        console.log("Submitting to:", fullUrl);

        form.setAttribute("action", fullUrl);
        form.submit();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error submitting form. Please try again.");
      setIsSubmitting(false);
      submittedRef.current = false;
    }
  };

  const onIframeLoad = () => {
    if (submittedRef.current) {
      console.log("Form submitted successfully");
      toast.success("Message sent successfully");
      submittedRef.current = false;
      setIsSubmitting(false);
      reset(initialValues);
    }
  };

  return (
    <div className="flex-center">
      <form
        ref={formRef}
        method="GET"
        target="hidden_iframe"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-[#a7a7a7] flex flex-col gap-7"
      >
        <div>
          <label
            className="block text-white md:text-2xl font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-white md:text-2xl font-semibold mb-2"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Your email"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-white md:text-2xl font-semibold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            placeholder="Subject"
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-white md:text-2xl font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            placeholder="Your message"
            rows={5}
            className="w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fafafa50] bg-black-300 rounded-md resize-none"
            disabled={isSubmitting}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-blue-50 text-white-50 font-semibold rounded-md hover:bg-blue-600 transition duration-300 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "SENDING..." : "SEND"}
        </button>
      </form>
      <iframe
        name="hidden_iframe"
        style={{ display: "none" }}
        onLoad={onIframeLoad}
      />
    </div>
  );
};

export default ContactForm;
