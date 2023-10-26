/* eslint-disable jsx-a11y/iframe-has-title */

import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className=" mt-[85px]">
      <iframe
        className="w-full h-[50vh]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1956758718543!2d105.79625707482028!3d20.98479198065354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc6bdc7f95f%3A0x58ffc66343a45247!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgR2lhbyB0aMO0bmcgVuG6rW4gdOG6o2k!5e0!3m2!1svi!2s!4v1695492074379!5m2!1svi!2s"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="py-28 gap-10 flex px-10 max-w-[1200px] mx-auto">
        <div className="basis-1/2">
          <h3 className="text-3xl mb-6">Contact Form</h3>
          <ContactForm />
        </div>
        <div className="basis-1/2">
          <h3 className="text-3xl mb-6">Contact us & our team.</h3>
          <p className="opacity-70 text-justify mb-6">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          </p>

          <div className="flex mb-3">
            <p className="basis-[15%]">Add:</p>
            <p className="w-full basis-[95%]">
              University of Transport and Technology, Trieu Khuc, Thanh Xuan,
              Hanoi
            </p>
          </div>
          <div className="flex mb-3">
            <p className="basis-[15%]">Email:</p>
            <p className="w-full basis-[95%]">chien2010nh@gmail.com</p>
          </div>
          <div className="flex mb-3">
            <p className="basis-[15%]">Phone:</p>
            <p className="w-full basis-[95%]">0816.516.215</p>
          </div>
        </div>
      </div>
    </div>
  );
}
