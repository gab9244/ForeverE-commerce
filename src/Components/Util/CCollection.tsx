import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";
type ClothesTypes = {
  imgSrc: string;
  altText: string;
  ClotheName: string;
  ClothePrice: number;
  id: number;
};
export const ClothesLinks = ({
  imgSrc,
  altText,
  ClotheName,
  ClothePrice,
  id,
}: ClothesTypes) => {
  return (
    <Link to={`/${id}`} className="cursor-pointer ">
      <CustomLink imgSrc={imgSrc} altText={altText} />
      <p className="text-xs">{ClotheName}</p>
      <p className="text-xs font-medium">${ClothePrice}</p>
      <img src="" alt="" />
    </Link>
  );
};
