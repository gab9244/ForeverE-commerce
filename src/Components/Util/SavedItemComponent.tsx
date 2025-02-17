import { useContext } from "react";
import { UserContext } from "../UserContext";

type SavedItemComponentPromps = {
  Items: { id: number; owner: string; size: string; quantity: number }[];
  updateQuantity: (uniqueKey: string, inputValue: string) => void;
  setinputValue: (value: number) => void;
  DeleteItem: (id: number, uniqueKey: string, size?: string) => void;
};

export const SavedItemComponent = ({
  Items,
  updateQuantity,
  setinputValue,
  DeleteItem,
}: SavedItemComponentPromps) => {
  // Contexto que compartilhar as informações do usuário entre os componentes
  const { clothes } = useContext(UserContext);
  return Items.map(
    (data, index) =>
      clothes.find((item) => item.id === data.id) && (
        <div className="flex border-t-2 border-b-2 p-4 gap-3" key={index}>
          <img
            src={clothes.find((item) => item.id === data.id)?.imgSrc}
            alt=""
            className="w-1/4 md:w-1/12"
          />
          <div className="w-full">
            <p className="text-xs mb-5">
              {clothes.find((item) => item.id === data.id)?.ClotheName}
            </p>
            <div className="flex justify-between">
              <div className="flex gap-5">
                <p className="text-lg font-medium">
                  ${clothes.find((item) => item.id === data.id)?.ClothePrice}
                </p>
                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                  {data.size}
                </p>
              </div>
              <div className="flex gap-5">
                <input
                  type="number"
                  className="w-10 border-2"
                  // Para fazer com que valores negativos não possam ser adicionados pelas setas
                  min={1}
                  value={data.quantity}
                  // O valor do input
                  onChange={(inputValue) => {
                    updateQuantity(
                      `${data.id}${data.size}`,
                      inputValue.target.value
                    );
                    setinputValue(Number(inputValue.target.value));
                  }}
                  // Para fazer com que o usuário não seja capaz de adicionar valores negativos ao input usaremos o evento onKeyDown
                  // Esse evento é usado quando queremos lidar com a tecla física que o usuário clicou, nesse caso verificamos se o usuário apertou a tecla que representa negativo e também a tecla e já que em alguns casos ela pode ser usada
                  onKeyDown={(event) => {
                    // Prevent the user from typing negative signs
                    if (event.key === "-" || event.key === "e") {
                      event.preventDefault();
                    }
                  }}
                />
                <p>{data.quantity}</p>
                <button
                  className="w-5"
                  onClick={() =>
                    DeleteItem(
                      data.id,

                      `${data.id}${data.size}`,

                      data.size
                    )
                  }
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
      )
  );
};
