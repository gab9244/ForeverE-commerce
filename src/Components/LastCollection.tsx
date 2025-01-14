import { ClothesLinks } from "./Util/CCollection";
import ClothesData from "./Util/Info.json"
interface Clothe {
  imgSrc: string;
  altText: string;
  ClotheName: string;
  ClothePrice: number;
  id:number;
}
const LastCollection1: Clothe[] = ClothesData.LastCollection1;
const LastCollection2: Clothe[] = ClothesData.LastCollection2;

export const Collection = () => {
  return (
    <div className="my-8">
      <div className="py-8">
        <div>
          <div className="flex justify-center items-center gap-2 font-medium pb-3">
            <p className="text-3xl font-serif">
              <span className="text-gray-500">LATEST</span> COLLECTIONS
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
          <p className="font-light text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            consectetur expedita accusamus aliquid. Culpa molestias optio atque
            animi, reprehenderit,
          </p>
        </div>
      </div>

{/* Acho que os links das roupas também podem ser colocados em um  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {LastCollection1.map ((data,index) =>{
          return <ClothesLinks  imgSrc={data.imgSrc} altText = {data.altText} ClotheName = {data.ClotheName} ClothePrice = {data.ClothePrice} key={index} id={data.id} />
        })}

      </div>

      <div className="py-8">
        <div>
          <div className="flex justify-center items-center gap-2 font-medium pb-3">
            <p className="text-3xl font-serif">
              <span className="text-gray-500">BEST</span> SELLERS
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
          <p className="font-light text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            consectetur expedita accusamus aliquid.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

      {LastCollection2.map ((data,index) =>{
          return <ClothesLinks  imgSrc={data.imgSrc} altText = {data.altText} ClotheName = {data.ClotheName} ClothePrice = {data.ClothePrice} key={index} id={data.id}/>
        })}
      </div>
    </div>
  );
};
