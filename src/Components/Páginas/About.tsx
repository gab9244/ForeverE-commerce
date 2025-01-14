import { AboutRText } from "../Util/AboutRText";

export const About = () => {
  return (
    <div>
      <div className="grid justify-items-center text-center w-full">
        <h1 className="text-3xl border-b-2 border-black my-10 font-serif">
          <span className="text-gray-500 ">ABOUT</span> US
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid md:justify-items-end md:mr-10">
          <img src="frontend_assets\about_img.png" alt="A mess of clothes" className="lg:w-[80%] w-full" />
        </div>
        <div className="flex flex-col md:justify-center lg:justify-normal lg:mt-10 gap-5">
          <p className="text-gray-500">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="text-gray-500">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="font-medium">Our Mission</p>
          <p className="text-gray-500">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond
          </p>
        </div>
      </div>
      <div>
        <div className="grid justify-items-center text-center w-full">
          <h2 className="text-2xl border-b-2 border-black my-16">
            <span className="text-gray-500">WHY</span> CHOOSE US
          </h2>
        </div>

        <div className="border-2 md:flex ">
          <AboutRText
            header="Quality Assurance:"
            paragraph="We meticulously select and vet each product to ensure it meets our stringent quality standards."
          />
          <AboutRText
            header="Convenience:"
            paragraph="With our user-friendly interface and hassle-free ordering process,
                shopping has never been easier."
          />
          <AboutRText
            header="Exceptional Customer Service:"
            paragraph="Our team of dedicated professionals is here to assist you the way,
                ensuring your satisfaction is our top priority."
          />
        </div>
      </div>
    </div>
  );
};
