
type CustomLinkProps = {
    imgSrc: string;
    altText: string;
  };
const CustomLink = ({  imgSrc, altText }: CustomLinkProps) => {
  return (
      <div className="overflow-hidden ">
        <img src={imgSrc} alt={altText} className="hover:scale-110 transition ease-in-out" />
      </div>
    
  );
};

export default CustomLink;
