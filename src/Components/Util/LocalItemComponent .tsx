import { useContext } from "react";
import { UserContext } from "../UserContext";

type LocalItemComponentPromps = {
  data: {
    imgSrc: string;
    altText: string;
    ClotheName: string;
    ClothePrice: number;
    id: number;
    ClothSize?: string;
    uniquekey? : string;
  };

  DeleteItem: (id: number, uniqueKey: string, size?: string) => void;
  updateQuantityLocally: (id: number, inputValue: number, size?:string) => void;
};

export const LocalItemComponent = ({
  data,
  DeleteItem,
  updateQuantityLocally,
}: LocalItemComponentPromps) => {
  const { quantities } = useContext(UserContext);
  const { ItemID } = useContext(UserContext);

  return (
    <div className="flex border-t-2 border-b-2 p-4 gap-3">
      <img src={data.imgSrc} alt="" className="w-1/4 md:w-1/12" />
      <div className="w-full">
        <p className="text-xs mb-5">{data.ClotheName}</p>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <p className="text-lg font-medium">${data.ClothePrice}</p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
            {
                ItemID.find(
                  (item: {
                    id: number;
                    size: string;
                    uniqueKey: string;
                  }) => item.id == data.id 
                )?.size
              }
            </p>
          </div>
          <div className="flex gap-5">
            <input
              type="number"
              className="w-10 border-2"
              min={1}
              value={
                quantities.find((q) => q.id === data.id )?.quantityValue || ""
              }
              onChange={(inputValue) =>{
               
                updateQuantityLocally(data.id, Number(inputValue.target.value), data.ClothSize)}
              }
              // Para fazer com que o usuário não seja capaz de adicionar valores negativos ao input usaremos o evento onKeyDown
              // Esse evento é usado quando queremos lidar com a tecla física que o usuário clicou, nesse caso verificamos se o usuário apertou a tecla que representa negativo e também a tecla e já que em alguns casos ela pode ser usada 
              onKeyDown={(event) => {
                // Prevent the user from typing negative signs
                if (event.key === '-' || event.key === 'e') {
                  event.preventDefault();
                }
              }}
            />
            <p>
              {quantities.find((q) => q.uniquekey === `${data.id}${data.ClothSize}`)?.quantityValue || ""}
            </p>
            <button
              className="w-5"
              onClick={() => DeleteItem(data.id,`${data.id}${data.ClothSize}`, data.ClothSize )}
            >
              <img
                src="public/frontend_assets/bin_icon.png"
                alt="A trash icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
