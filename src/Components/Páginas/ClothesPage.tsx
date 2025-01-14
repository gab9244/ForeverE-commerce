import { Link } from "react-router-dom";
import { ClothesLinks } from "../Util/CCollection";
import ClothesData from "../Util/Info.json";
import { SizeBtns } from "../Util/SizeBtns";
import { StartsFactory } from "../Util/StartsFactory";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
interface Clothe {
  imgSrc: string;
  altText: string;
  ClotheName: string;
  ClothePrice: number;
  Categorie: string;
  id: number;
}
const CollectionData: Clothe[] = ClothesData.CollectionData;

export const Clothes = ({
  imgSrc,
  altText,
  ClotheName,
  ClothePrice,
  id,
}: Clothe) => {
  const [Size, setSize] = useState("");
  const {ItemID,setItemID } = useContext(UserContext);
  const { setClothes } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  const { setQuantities } = useContext(UserContext);

  // Criar estado inicial com a nova propriedade

  const AddingItem = async () => {
    if (Size === "") {
      return alert("Please insert a size");
    }
    if (userInfo.username) {
      // Solicitação que adiciona o id do item ao banco de dados
      await fetch("http://localhost:3000/addItem", {
        method: "POST",
        body: JSON.stringify({
          id,
          owner: userInfo?.username,
          size: Size,
          quantity: 1,
        }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((error) => alert(`Falha ao criar item: ${error.message}`));
      // Se o dono do item for o mesmo que o usuário logado, adicionaremos a propriedade owner e passaremos como valor o username que estiver logado
    }
    // Fazer a solicitação de update do valor de quantity no caso do usuário querer adicionar o mesmo elemento ao banco de dados
    // Antes de adicionar item ao carrinho do usuário não logado é necessário fazer algumas verificações, como só adicionar itens iguais caso o tamanho seja diferente do já adicionado e caso o item já tenha sido adicionado e tentamos adicionar o do mesmo tamanho que apenas incrementemos a quantidade em 1.
    // Para lidar com o adicionamento de itens de tamanhos iguais usaremos uma propriedade chamada de uniqueKey que junta tanto o id da roupa como seu tamanho para gerar uma propriedade com valor único 
    setItemID((prev) => {
        // 1. Vamos criar a variável que vai recebe a uniqueKey que será usada para dar valor único para a propriedade uniqueKey, assim tornando cada item único
      const newUniqueKey = `${id}${Size}`
      // 2. Verifique se algum item já possui a uniqueKey 
      const itemExistes = prev.some(
        (item) =>  `${item.id}${item.size}` == newUniqueKey
        
      );
      // 3. Caso algum item possua a uniqueKey faça com que nada aconteça
      if (itemExistes) {
        return prev;
      } 
      // 4. Caso a uniqueKey não exista crie um novo objeto na array estado, adicionando todas as propriedade que usaremos mais adiante 
      else {
        // A propriedade uniqueKey serve para tornar cada objeto único mesmo no caso de itens terem o mesmo id, mas tamanhos diferentes
        return [...prev, { id: id, size: Size , uniqueKey: newUniqueKey}];
      }
    });
    

    // Para fazer que o valor da quantidade de uma certa roupa funcione precisei usar um contexto, nesse código adicionamos 1 ao valor da quantidade sempre que o mesmo item for adicionado ao carrinho e caso ele ainda não tenha sido adicionado, o adicionamos a array que lida com a quantidade, também fazemos com que o valor inicial da quantidade seja 1 para fazer sentido.
    setQuantities((prevQuantities) => {
      // 1.Verificamos se o objeto que representa o item existe no contexto
      // Verifique se o id do item já existe no contexto
      const itemExists = prevQuantities.find((item) => item.uniquekey ===  `${id}${Size}`);
      // Caso o item exista atualize o item incrementando seu valor em 1
      if (itemExists) {
        //Se o item existir atualize o seu valor do quantityValue
        return prevQuantities.map((item) =>
          item.uniquekey === `${id}${Size}`
            ? { ...item, quantityValue: item.quantityValue + 1 } // Atualiza o valor do quantity
            : item
        );
      } else {
        // 3. Caso não exista crie um novo para o item que será adicionado ao carrinho
        // Adicione um novo item ao estado e faça com que o valor inicial da quantidade seja 1
        return [...prevQuantities, { id, quantityValue: 1, uniqueKey:`${id}${Size}` }];
      }
    });

  };

  const SizeHandle = (e: string) => {
    // Usamos a função do estado Size para adicionar o tamanho escolhido ao estado
    setSize(e);
    // Aqui criamos a nova propriedade ClothSize e colocamos ela em todos os elementos que tiverem o id igual ao id do elemento que clicou o botão para adicionar ao carrinho. ClothSize será o valor do tamanho da roupa, ele precisa ser adicionado dinamicamente, pois não será proprio de cada objeto
    // Primeiro pegamos do contexto a array de objetos que constitui os dados das roupas, depois usamos o método map para criar uma nova propriedade em cada objeto caso o id da roupa adicionada ao carrinho seja igual ao id do objeto, se não for apenas retornamos o objeto e nada acontece
    // Tenho que levar em conta que a única coisa que estamos fazendo é adicionar a propriedade ClothSize em todos os objetos e caso a propriedade 
    // O problema desse código é que ele mudara o valor da propriedade size de todos os itens com o mesmo id, mesmo os que já estão no carrinho, isso acontece porque eu uso a propriedade ClothSize para mostrar o tamanho da roupa.

    // Vamos usar apenas a uniquekey para adicionar o tamanho das roupas, faremos isso adicionando a propriedade uniquekey aos dados que estão salvos localmente
    // O objetivo dessa função é apenas adicionar o tamanho da roupa usando o uniqueKey
    setClothes((prevClothes) =>{
      // 1. Verifique se algum item com o mesmo id e size existe na array 
      // Não faz sentido perguntar se a uniquekey existe em algum item, já que essa propriedade não é adicionada aos itens da array clothes, ele apenas existe na array ItemID
      // O problema que estamos encontrando é que não estou sendo capaz de usar as propriedades que ainda vão ser adicionadas ao contexto para fazer verificações

      const itemExists = prevClothes.some((item)=>item.id === id)
      console.log(itemExists)
      // 2.Caso ele exista nada acontece
      if(itemExists ){
        return prevClothes
      }
      // 3.Caso o item não exista
      return prevClothes.map((item) =>
        item.id === id && item.ClothSize === Size
          ? { ...item, ClothSize: e,uniquekey:  `${id}${e}`}
          : item
      );
  })
    // Como eu faria uma verificação onde mesmo que o objeto tenha o mesmo id, o valor do ClothSize não seria mudado
  };
    useEffect(() => {
  console.log(ItemID)      
    }, [ItemID]);
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-7 ">
      <div className="md:grid grid-cols-2  ">
        <div className="flex flex-col-reverse md:flex-row gap-3 ">
          <div className="flex sm:flex-col  sm:justify-normal sm:w-[18.7%] w-full">
            <img
              src={imgSrc}
              alt={altText}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            />
          </div>
          <div className="w-full ">
            <img src={imgSrc} alt={altText} className="md:w-[80%] w-full" />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="flex-1">
            <h1 className="font-medium text-lg">{ClotheName}</h1>
            <div className=" flex items-center gap-1 mt-2">
              <StartsFactory />
              <StartsFactory />
              <StartsFactory />
              <StartsFactory />
              <img
                src="frontend_assets\star_dull_icon.png"
                alt="Empty Start"
                className="w-3"
              />
              <p>(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">${ClothePrice}</p>
            <p className="py-7 text-sm text-gray-500">
              A lightweight, usually knitted, pullover shirt, close-fitting and
              with a round neckline and short sleeves, worn as an undershirt or
              outer garment.
            </p>
          </div>
          <div className="border-b-2 border-gray-400 grid gap-5 ">
            <p className=" font-medium">Select size</p>
            <div className="flex gap-4">
              <SizeBtns text="S" onClick={() => SizeHandle("S")} />
              <SizeBtns text="M" onClick={() => SizeHandle("M")} />
              <SizeBtns text="L" onClick={() => SizeHandle("L")} />
              <SizeBtns text="XL" onClick={() => SizeHandle("XL")} />
              <SizeBtns text="XXL" onClick={() => SizeHandle("XXL")} />
            </div>
            <button
              className="bg-black text-white w-1/2 h-10  text-sm font-medium active:bg-gray-600 mb-5"
              onClick={AddingItem}
            >
              ADD TO CART
            </button>
          </div>
          <ul className="text-sm text-gray-500 my-5">
            <li>100% Original product.</li>
            <li>Cash on delivery is available on this product.</li>
            <li>Easy return and exchange policy within 7 days.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex text-sm ">
          <h3 className="border-2 p-3 font-medium">Description</h3>
          <h3 className="border-2 p-3">Reviews(122)</h3>
        </div>
        <div className="border-2 p-2 text-xs">
          <p className="text-sm text-gray-500 ">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="border-b-2 border-gray-300 text-3xl text-center mb-5  ">
          <span>RELATED</span> PRODUCTS
        </h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:flex">
          {CollectionData.map((data, index) => {
            if (index < 5) {
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
          })}
        </div>
      </div>

      <div className=" grid justify-center ">
        <Link
          to={"/Collection"}
          className=" mt-10 text-lg font-medium bg-black text-white  p-3 text-center active:bg-gray-300"
        >
          Back to Collection
        </Link>
      </div>
    </div>
  );
};
