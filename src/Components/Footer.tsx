import { Link } from "react-router-dom";

export const Footer = () => {
  const ArrayObf = [
    {
      Header: "Customer Support",

      Links: ["Contact Us", "FAQs", "Shipping & Delivery", "Returns & Exchanges"],
    },
    {
      Header: "About Us",
      Links: ["Our Story", "Sustainability", "Careers", "Press"],
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3  text-center py-16  px-6 mt-8 ">
        <div className="">
          <Link to={"/"}>
              <img src="\frontend_assets\logo.png" alt="Forever logo" className="Logo w-36"/>
          </Link>
          <p className="text-justify text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur incidunt rerum voluptas aut, odio provident laudantium odit esse accusamus earum doloribus libero ab, facilis sequi non deserunt ut nemo?</p>
        </div>
      {ArrayObf.map((e, index) => {
        return (
          <div key={index} className="grid gap-5 justify-start md:justify-center">
            <h4 className="font-bold text-lg">{e.Header}</h4>
            <div className="grid gap-3">
              {e.Links.map((element,index) => {
                return <a href="#" onClick={(e) => e.preventDefault()} key={index}>{element}</a>
              } )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
