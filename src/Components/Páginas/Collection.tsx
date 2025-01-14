// Este componente deve ter um input, algumas opções de filter e varias caixas de roupas.
// Conforme o valor do input muda, as imagem mostradas devem possuir alguma relação com o valor
// Apenas imagem relacionadas ao valor colocado no input devem ser mostradas
// Por padrão toda a lista deve ser mostrada e conforme o valor mudar apenas as imagens relacionadas ao input devem ser mostradas
// O filtro deve possuir três opções, uma para homens, uma para mulheres e uma para crianças.

import { useState } from "react";
import { ClothesLinks } from "../Util/CCollection";
import ClothesData from "../Util/Info.json";

interface Clothe {
  imgSrc: string;
  altText: string;
  ClotheName: string;
  ClothePrice: string;
  Categorie: string;
  id: number;
}
const CollectionData: Clothe[] = ClothesData.CollectionData;
// Os filtros escolhidos devem influenciar as imagens mostradas
export const Collection = () => {
  const [ShowM, setShowM] = useState(false);
  // const [Filters, setFilters] = useState<string[]>([]);
  const [Men, setMen] = useState(false);
  const [Women, setWomen] = useState(false);
  const [Kids, setKids] = useState(false);
  const Show = () => {
    setShowM(!ShowM);
  };

  return (
    <div className="py-20  grid gap-2">
      <div className="grid justify-items-center text-center w-full">
        <h2 className="text-3xl border-b-2 border-black px-7 font-serif">
          <span className="text-gray-400">ALL</span> COLLECTION
        </h2>
      </div>
      <div className="md:w-1/4 py-10 ">
        <div className="flex flex-col px-7 ">
          <h2
            className="text-xl cursor-pointer border-2 w-28 p-2 mb-7"
            onClick={Show}
          >
            Filters
          </h2>
          <form
            className={
              ShowM
                ? " grid gap-5 ease-in duration-500  w-full mb-8  "
                : "hidden ease-in"
            }
          >
            <h3 className="font-sans ">Categories</h3>
            <div className="md:grid gap-3 flex">
              <label htmlFor="Men" className="flex gap-4 mt-2 labelInput">
                <input
                  type="checkbox"
                  name="Men"
                  id="Men"
                  value={"men"}
                  className="custom-input"
                  onChange={() => setMen(!Men)}
                />
                <span className="label-btn "></span>
                <span className="label-text">Men:</span>
              </label>
              <label htmlFor="Women" className="flex labelInput">
                <input
                  type="checkbox"
                  name="Women"
                  id="Women"
                  value={"women"}
                  className="custom-input"
                  onChange={() => setWomen(!Women)}
                />
                <span className="label-btn"></span>
                <span className="label-text ">Women:</span>
              </label>
              <label htmlFor="Kids" className=" gap-2 labelInput">
                <input
                  type="checkbox"
                  name="Kids"
                  id="Kids"
                  value={"kids"}
                  className="custom-input"
                  onChange={() => setKids(!Kids)}
                />
                <span className="label-btn"></span>
                <span className="label-text">Kids:</span>
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Vamos criar as imagens usando uma array e map, se não vamos perder horas só para fazer isso  */}
      {/* O display da coleção funciona da seguinte maneira: Primeiro perguntamos se alguma filtro foi selecionado, se não foi todos os itens da coleção seram mostrados, caso contrario, perguntaremos se certo filtro foi selecionado, caso ele seja mostraremos os itens relacionados a ele, caso mais de um filtro seja selecionado os itens do filtro selecionado também seram mostrados com os demais. */}
      {/* É possível substituir esse ifs por um switch */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 px-7 ">
        {Men || Women || Kids
          ? CollectionData.map((data, index) => {
              if (Men && data.Categorie === "men") {
                return (
                  <ClothesLinks
                    imgSrc={data.imgSrc}
                    altText={data.altText}
                    ClotheName={data.ClotheName}
                    ClothePrice={data.ClothePrice}
                    key={index}
                    id={data.id}
                  />
                );
              }
              if (Women && data.Categorie === "women") {
                return (
                  <ClothesLinks
                    imgSrc={data.imgSrc}
                    altText={data.altText}
                    ClotheName={data.ClotheName}
                    ClothePrice={data.ClothePrice}
                    key={index}
                    id={data.id}
                  />
                );
              }
              if (Kids && data.Categorie === "kids") {
                return (
                  <ClothesLinks
                    imgSrc={data.imgSrc}
                    altText={data.altText}
                    ClotheName={data.ClotheName}
                    ClothePrice={data.ClothePrice}
                    key={index}
                    id={data.id}
                  />
                );
              }
            })
          : CollectionData.map((data, index) => {
              return (
                <ClothesLinks
                  imgSrc={data.imgSrc}
                  altText={data.altText}
                  ClotheName={data.ClotheName}
                  ClothePrice={data.ClothePrice}
                  key={index}
                  id={data.id}
                />
              );
            })}
      </div>
    </div>
  );
};

{
  /* <form className="hidden md:grid gap-2 ">
          <label htmlFor="Men" className="flex gap-2 mt-2 ">
            <input
              type="checkbox"
              name="Men"
              id="Men"
              value={"men"}
              className="custom-input"
              onChange={() => setMen(!Men)}
            />
            <span className="label-btn"></span>
            <span className="label-text">Men</span>
          </label>
          <label htmlFor="Women" className="flex gap-2 ">
            <input
              type="checkbox"
              name="Women"
              id="Women"
              value={"women"}
              className="custom-input"
              onChange={() => setWomen(!Women)}
            />
            <span className="label-btn"></span>
            <span className="label-text">Women</span>
          </label>
          <label htmlFor="Kids" className="flex gap-2 ">
            <input
              type="checkbox"
              name="Kids"
              id="Kids"
              value={"kids"}
              className="custom-input"
              onChange={() => setKids(!Kids)}
            />
            <span className="label-btn"></span>
            <span className="label-text">Kids</span>
          </label>
        </form> */
}
