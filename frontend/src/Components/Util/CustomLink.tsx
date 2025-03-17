
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

// Este componente serve para modelar cada imagem como um link, como podemos ver o componente CustomLink recebe a src da imagem e o texto alt.
// O objetivo desse componente é manter o código limpo, já que separamos a criação do link/imagem do componente onde essas imagem ficaram assim o código ficara muito mais limpo.