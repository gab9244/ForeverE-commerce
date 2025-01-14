export const Contact = () => {
  return (
    <div className="grid justify-items-start gap-5 md:justify-center ">
      <div className="grid justify-items-center text-center w-full font-serif">
        <h1 className=" text-2xl my-10  border-b-2 border-black">
        <span className="text-gray-400">CONTACT </span>US
        </h1>
      </div>
      <div className="md:flex gap-10">
        <div className="grid md:justify-items-end">
          <img
            src="frontend_assets\contact_img.png"
            alt=""
            className="md:w-[55%] w-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <h3 className="font-medium text-2xl text-gray-700">Our store</h3>
          <div className="text-gray-500">
            <p>
            54709 Willms Station
            </p>
            <p>
            Suite 350, Washington, USA
            </p>
          </div>
          <div className="text-gray-500">
            <p>tel: (***)***-***</p>
            <p>Email:***@gmail.com</p>
          </div>
          <h3  className="font-medium text-2xl text-gray-700">Careers at Forever</h3>
          <p className="text-gray-500">Learn more about out teams and job openings</p>
          <button className="border-2 p-5  w-1/3 md:w-1/2 text-sm border-black hover:bg-black hover:text-white ease-in-out duration-500">Explore jobs</button>
        </div>
      </div>
    </div>
  );
};
