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
  // Para fazer o carrinho do usuário não logado usei uma array Items que representa o carrinho, usando map na array criei um item por objeto na array
  return Items.map(
    (data, index) =>
      // Para mostrar os itens eu fiz uma comparação com a array de dados(clothes é o contexto que possui todos os dados de cada roupa)
      clothes.find((item) => item.id === data.id) && (
        <div className="flex border-t-2 border-b-2 p-4 gap-3" key={index}>
          <img
            // Para pegar o src de cada roupa procuramos no clothes usando a propriedade id tanto da array que representa o carrinho quanto da array com os dados da roupa
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
                  {/* Para renderizar dados dinâmicos como o tamanho da roupa preferi colocar-los dentro da array Items, já que não foi possível colocar essas propriedades dentro de clothes*/}
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
                  // Sempre que o valor dos inputs for mudado executaremos a funções updateQuantity passando o valor da uniqueKey da roupa assim como o valor do input e também vamos alterar o valor do estado InputValue, estado esse que representa o valor do input
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
                    // Usando este argumento if prevenimos o uso de símbolos negativos no input
                    if (event.key === "-" || event.key === "e") {
                      event.preventDefault();
                    }
                  }}
                />
                <p>{data.quantity}</p>
                <button
                  className="w-5"
                  onClick={() =>
                    // Além de executamos a função que deleta o item assim que o botão de delete for apertado, também passamos 
                    DeleteItem(
                      data.id,
                      `${data.id}${data.size}`,
                      data.size
                    )
                  }
                >
                  <img
                    src="frontend_assets/bin_icon.png"
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
