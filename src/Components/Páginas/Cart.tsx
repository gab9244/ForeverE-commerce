import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { updateLocalStorage } from "../Util/LocalStoragefunctions";
import { SavedItemComponent } from "../Util/SavedItemComponent";
import { LocalItemComponent } from "../Util/LocalItemComponent ";

export const Cart = () => {
  const [Items, setItems] = useState<
    { id: number; owner: string; size: string; quantity: number }[]
  >([]);
  // Contexto que compartilhar o id e o tamanho das roupas localmente, esse contexto é usado na lógica de mostrar os itens localmente
  const { ItemID, setItemID } = useContext(UserContext);
  // Contexto que compartilhar todas as informações das roupas, é uma array de objetos onde cada objeto é uma roupa
  const { clothes } = useContext(UserContext);
  // Contexto que compartilhar as informações do usuário entre os componentes
  const { userInfo } = useContext(UserContext);
  // Estado que guardar o valor total das roupas
  const [total, setTotal] = useState<number>(0);

  // Contexto que compartilhar a quantidade das roupas localmente
  const { quantities, setQuantities } = useContext(UserContext);
  // Estado que guarda o valor do input de quantidade de cada roupa
  const [inputValue, setinputValue] = useState<number>();

  // Estado que contem o valor do total das roupas mais o valor da entrega
  const [PlusFee, setPlusFee] = useState<number>(0);
  // Pega todos os itens salvos no banco de dados
  const ShowAllItens = async () => {
    await fetch(`http://localhost:3000/getAllItems`, {
      method: "GET",
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
        // Não será possivel usar o owner como valor de comparação, então peque os ids que
        // Arrume uma maneira de apenas adicionar ids de itens que possuírem  um owner em sí
        // faça com que apenas os ids de itens que possuirem um username igual ao da propriedade owner seja adicionados ao estado
        // ids recebe apenas os dados salvos pelos usuário logado no momento
        // Primeiro usamos o método filter nos dados que pegamos do mongodb, para filtrar apenas os itens salvos pelo usuário, comparamos a propriedade owner dos itens salvos no mongodb com o nome do usuário logado: .filter((item: { owner: string }) => item.owner === userInfo.username)

        // Em seguida usamos o método map para criar uma nova array que é constituída pelos dados dos itens salvos pelo usuário
        // Por fim passamos essa array de objetos que criamos para o estado Items, ele é usado para comparar o id dos itens salvos localmente com os salvos no banco de dados para que possamos renderizar apenas os itens salvos pelo usuário
        const ids = data
          .filter((item: { owner: string }) => item.owner === userInfo.username)
          .map(
            (item: {
              id: number;
              owner: string;
              size: string;
              quantity: number;
            }) => ({
              id: item.id,
              owner: item.owner,
              size: item.size || "M",
              quantity: item.quantity,
            })
          );
        setItems(ids); // Atualiza o estado com os IDs
      })
      .catch((error) => alert(`Falha ao criar item: ${error.message}`));
  };

  // Para executar o pedido de pegar os dados do banco de dados apenas uma vez, usamos useEffect com a array vazia
  // useEffect(() => {
  //   ShowAllItens();
  // }, [userInfo]);
  useEffect(() => {
    ShowAllItens();
  }, [inputValue]);
  // useEffect para monitorar mudanças no estado
  useEffect(() => {
    const Soma = () => {
      // Crie a array que receberá todos os itens presentes no carrinho
      let AddToCart = [];
      // Para os usuário logados
      if (userInfo?.username) {
        // Filtra os itens salvos pelo usuário logado
        AddToCart = clothes.filter((data) =>
          Items.some(
            (item) => item.id === data.id && item.owner === userInfo.username
          )
        );
      } else {
        // Para usuários não logados, usa o contexto ItemID
        // Aqui criamos uma array que possui apenas os itens já adicionados ao carrinho
        AddToCart = clothes.filter((data) =>
          ItemID.some((item) => item.id === data.id)
        );
      }

    

      // Agora vamos criar uma array de objetos que será constituída pelos itens que estão presentes no carrinho
      // AddToCart é uma array constituída pelos item que estão no carrinho, ela pode mudar sua constituição baseado no usuário está logado ou não
      const InTheCart = AddToCart.map((item) => {
        // 1. Criaremos a variável matchingItem e lhe daremos como valor inicial null, fazemos isso, pois essa variável servira para guardar um objeto, mas como o objeto pode ser diferente baseado em alguns fatores lhe daremos valor null.
        let matchingItem = null
        //2. Caso o usuário esteja logado matchingItem terá como valor o item pego no banco de dados
        if(userInfo.username){
            matchingItem = Items.find(
            (logado) => logado.id === item.id
          );
          // 3. Retornamos um objeto, que possui como propriedades o valor da roupa e a sua quantidade
          return {
            // A primeira propriedade é o valor do objeto que corresponde ao item adicionado ao carrinho
            preço: item.ClothePrice,
            // A segunda propriedade é a quantidade do item que achamos quando comparamos o id da quantidade com o id do item sem si
            quantidade: matchingItem ?  matchingItem.quantity : 0, // Defina a quantidade
          };
        }
        // 2. Caso o usuário não esteja logado definiremos como valor de matchingItem o item salvo pelo contexto quantities que é igual ao item que deve ser calculado no momento
        else {
           matchingItem = quantities.find(
            (quantidade) => quantidade.id === item.id
          );
          // 3. Retornamos um objeto que é constituído pelo valor da roupa atual e a sua quantidade 
          return {
            preço: item.ClothePrice,
            quantidade: matchingItem ?  matchingItem.quantityValue : 0, 
          };
        }
      });

      // Atualiza o estado total com a soma dos preços caso algum item tenha sido adicionado ao carrinho
      if (InTheCart.length > 0) {
        // Agora o estado total leva a quantidade do item em conta quando faz o calculo final
        // Primeira usamos o método reduce na array com  itens que estão no carrinho, depois somamos o total mais o preço da roupa vezes a quantidade da roupa e com isso sempre que fizemos qualquer mudança no carrinho, ele tera seu valor total atualizado, mas agora também será capaz de levar a quantidade de cada roupa em conta quando estiver fazendo a soma.
        // O item que sera usado para fazer a soma vareia baseado no usuário está logado ou não.
        setTotal(InTheCart.reduce((total, item) => total + item.preço * item.quantidade, 0));
      } else {
        setTotal(0); // Define como zero se nenhum item for encontrado
        setPlusFee(0); // Define como zero se nenhum item for encontrado
      }
    };

    Soma(); // Chama a função para calcular o total
  }, [Items, clothes, ItemID, userInfo,quantities]); // Adiciona dependências relevantes
  // A função Soma é executada sempre que a array dos itens adicionados pelo usuário não logado for atualizada, assim com a array dos itens pegos no banco de dados, também quando o usuário logar e quando os itens no carrinho forem alterados

  // Aqui usamos o useEffect para atualizar o valor total mais os 10 da entrega, para que o valor seja atualizado corretamente colocamos o estado total como segundo parâmetro do hook
  useEffect(() => {
    if (total) {
      setPlusFee(() => total + 10);
    }
  }, [total]);

  // Este useEffect atualiza o valor da chave dos itens salvos no carrinho localmente sempre que o valor da quantidade de uma roupa é atualizada
  useEffect(() => {
    try {
      localStorage.setItem("cartQuantities", JSON.stringify(quantities));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [quantities]);
  // Este userEffect em como proposito limpar o cacher do localStorage sempre que a página for fechada ou recarregada, não re-renderizada

  useEffect(() => {
    localStorage.clear();
  });
    // Esta função é usada para atualizar o valor da quantidade dos itens salvos no banco de dados pelo usuário logado
  // updateQuantity é a função que usaremos para atualizar o valor do quantity, assim que o valor do input do elemento correspondente for alterado
  const updateQuantity = async (id: number, inputValue: string) => {
    try {
       await fetch(
        `http://localhost:3000/updateQuantity/${id}/${inputValue}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      
    } catch (error) {
      console.log(error);
    }
    ShowAllItens();
  };


  const updateQuantityLocally = (id: number, inputValue: number, size:string | undefined) => {
    // Eu quero criar um estado array de objetos, onde cada objeto possui duas propriedade id e quantityValue, eu quero ser capaz de mudar o valor de um desse objetos sempre que a função updateQuantityLocally for executada, para identificar o objeto que eu quero altera vou usar a propriedade id para verificar se o objeto que eu quero altera bate com o id do input que esta mudando seu valor, já que a função seria executado sempre que algum input fosse alterado. Também quero usar a propriedade quantityValue para mostrar o valor de cada objeto/ do input
    setQuantities((prevQuantities) => {
      // Verifique se o id do item já existe no estado
      const itemExists = prevQuantities.some((item) => item.id === id);
      console.log(itemExists)
      if (itemExists) {
        //Se o item existir atualize o seu valor do quantityValue
        return prevQuantities.map((item) =>
          item.id === id
            ? { ...item, quantityValue: inputValue } // Atualiza o valor do quantity
            : item
        );
      } else {
        // Adicione um novo item ao estado
        return [...prevQuantities, { id, quantityValue: inputValue}];
      }
    });
  };


  // A função DeleteItem é usada para deletar uma das roupas clicadas
  // Ela recebe o id da roupa como parâmetro e faz uma simples solicitação de delete, onde passa o id da roupa na url, dessa forma podemos pegar o id da roupa pelos params no backend da solicitação, e com isso podemos deletar o item baseado no sei id, por fim caso consigamos deletar a roupa, atualizamos o estado da lista removendo a roupa deletada
  const DeleteItem = async (ItemId: number, uniqueKey: string | undefined , Size: string | undefined ) => {
    if (userInfo.username !== "") {
      try {
        const response = await fetch(`http://localhost:3000/delete/${ItemId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          // Atualize localmente o estado antes de buscar os dados atualizados
          //  Ao ínves de atualizar o estado filtrando o item que queremos deletar, apenas chamaremos a função que pega todos os itens do banco de dados, assim a lista aparecerá sem o itens já que ela reflete o que está salvo no banco de dados
          await ShowAllItens();
          console.log("Items após ShowAllItens:", Items);
          // setClothes((prev)=> prev.filter((item) => !(item.id === ItemId)))
          // Atualize os itens após excluir
          // Com este console eu descobrir que estou removendo itens da lista de dados ao invés de remove-los da lista que é usada para fazer a comparação com o contexto de dados
          // console.log(clothes);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Precisamos deletar o objeto na chave que guardamos os objetos, para que não aconteça um erro, vamos achar o objeto dentro da chave que é correspondente ao item que será deletado da seguinte maneira:
    // 1. Recuperar a array atual do localStorage
    // 2. Filtrar a array para excluir o objeto com o id correspondente
    // 3. Atualizar o estado no React e sobrescrever a array no localStorage
    if (!userInfo.username) {  
      // Para deletar itens vou usar a uniqueKey ao invés de id e o tamanho da roupa
      setItemID((prev) => {
        return prev.filter((item) =>(`${item.id}${Size}` !== uniqueKey));
      });

          // Limpa o valor da quantidade dos itens salvos pelo usuário não logado, usamos a propriedade uniqueKey para não deletar a quantidade de outros itens com o mesmo id, mas tamanhos diferentes
    setQuantities((prev) => {
      return prev.filter((item) =>(item.id !== ItemId));
    });

      // LocalStorage
      // 1. Recuperar a array atual do localStorage
      const storegedQuantities = localStorage.getItem("cartQuantities");
      // Se a chave não existir apenas retorne nada
      if (!storegedQuantities) return;
      try {
        updateLocalStorage("cartQuantities", ItemId, Size);
        console.log(storegedQuantities);
      } catch (erro) {
        console.log(erro);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="grid justify-items-center text-center w-full py-10">
          <h2 className="font-serif text-3xl border-b-2 border-black px-7  ">
            <span className="text-gray-400">YOUR</span> CART
          </h2>
        </div>

        <div>
          {/* Para mostrar apenas as roupas dos usuários logados usamos o estado Items(que possui todos os dados dos itens salvos pelo usuário no banco de dado), perguntamos se algum objeto dentro do contexto Items possui id igual ao dos objetos locais e também perguntamos se o usuário que salvou a roupa é o mesmo que esta logado, se sim renderizamos os itens salvos pelo user no mongodb */}

          {clothes.map((data, index) =>
            userInfo.username 
              ? Items.map(
                  (item) =>
                    item.id === data.id && (
                      <SavedItemComponent
                        updateQuantity={updateQuantity}
                        setinputValue={setinputValue}
                        data={data}
                        Items={Items}
                        DeleteItem={DeleteItem}
                        key={index}
                      />
                    )
                )
                // Para renderizar os itens no carrinho do usuário não
              : ItemID.map((item, position) =>
                  item.id === data.id &&
                  ItemID.find(
                    (item) =>
                       item.id === data.id
                  ) ? (
                    <LocalItemComponent
                      key={position}
                      data={data}
                      updateQuantityLocally={updateQuantityLocally}
                      DeleteItem={DeleteItem}
                    />
                  ) : null
                )
          )}
        </div>
      </div>

      <div className="flex md:justify-end mt-10">
        <div className="flex flex-col gap-5 md:w-1/3 w-full">
          <div className="grid justify-items-center text-center w-full py-10">
            <h2 className="font-serif text-3xl border-b-2 border-black px-7  ">
              <span className="text-gray-400">CART</span> TOTAL
            </h2>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-medium">${total}.00</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p className="font-medium">$10.00</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Total</p>
            <p className="font-medium">${PlusFee}.00</p>
          </div>
          <div className="flex justify-end">
            <button className="bg-black text-white w-1/2 h-10  text-sm font-medium active:bg-gray-600 mb-5">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
