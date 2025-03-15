

Coisas que ainda faltam

Primeiro vamos criar no header um painel de navegação com os links para cada página do app
Os links para coleção, Login e carrinho não ficaram no menuH, mas os link para as outras página passaram a ficar nesse menu


Página de Coleção(X)
Página sobre(X)
Página de contato(X)
Página de Login(X)
Página do carrinho(X)

Vou fazer o backend
Ele será bem parecido com o do task-manage.
Uma parte para o usuário e uma para o carrinho




Como o carinho deve funcionar
Quando um novo item for adicionado ao carinho, ele aparecer na página do carrinho, assim como deve ficar guardado no banco de dados

Como eu vou renderizar o carinho certo:
    Para renderizar os itens do carinho eu vou pegar o id de cada item e fazer com que apenas os itens com o id selecionado sejam renderizados

Fazer com que os itens salvos por um usuário logado sejam renderizados assim que o usuário logar na sua conta com os itens salvos

Como fazer com que os itens salvos pelo usuário sejam 


Lembre-se de baixar o multer


Vamos precisar usar useContext, já que precisaremos passar o nome do usuário para o componente que possuo o botão que vai adicionar o elemento ao carinho. 

Quando o botão que adiciona o item carinho for apedado ele deve fazer a solicitação de post, onde essa vai enviar o nome do user, 



Não faz sentido mandar mais do que o id de cada elemento para o mongodb, já que todo o conteúdo de um item pode ser renderizado se eu tiver o id dele, que nesse caso será o user name


Mando o id e o username


Primeiro eu preciso fazer uma solicitação get que pega todos os elementos no banco de dados

Fazendo a funcionalidade de adicionar os itens ao carrinho
Como fazer com que os itens sejam mostrados sem precisar manda-los para o mongodb()

Se o usuário não estiver logado os itens não seram guardados dentro do banco de dados, caso ele esteja os ids seram guardados juntos do nome do usuário logado


            Como fazer com que o tamanho de cada roupa apareça
    1.Criar um contexto com o formato dos objetos json:
        1.primeiro vamos importar os dados dos objetos que constituem a nossa array json com todos os dados das roupas, assim como uma interface para definir os tipos dos dados: 
        //No arquivo dos contextos
<pre>
    <code>
        import ClothesData from "./Util/Info.json";
        // Clothe é o formato dos objetos que constituem a array de objeto  que contém todos os dados das roupas
        interface Clothe {
        imgSrc: string;
        altText: string;
        ClotheName: string;
        ClothePrice: string;
        Categorie: string;
        id: number;
        // Caso ClothSize não exista erros não vão acontece, fazemos isso, pois a propriedade só sera criada depois de colocamos alguma roupa no carrinho
        ClothSize?: string;
        }
        // CollectionData nada mais é do que os dados do json tento seus tipos definidos
        const CollectionData: Clothe[] = ClothesData.CollectionData;
    </code>
</pre>



    1. No componente onde o tamanho da roupa é escolhido, adicionaremos ao contexto(que representa os dados json) a propriedade que representa o tamanho escolhido assim como o valor: 
    2. 
    //Importe o contexto
    const {setClothes} = useContext(UserContext);

    //A função SizeHandle pega o valor do botão clicado e executa a função do contexto para criar a propriedade que representa o tamanho da roupa, assim como pega o valor do botão e defini como valor dessa propriedade caso os ids do objeto e da roupa clicada sejam iguais

     const SizeHandle = (e: string) => {

    // Aqui criamos a nova propriedade ClothSize e colocamos ela tem todos os elementos que diverem o id igual ao id do elemento que clicou o botão para adicionar ao carrinho. ClothSize será o valor do tamanho da roupa, ele precisa ser adicionado dinamicamente, pois não será proprio de cada objeto, já que ele será adicionado ao itens que acabou de ser adicionado ao carrinho

    // Primeiro pegamos do contexto a array de objetos que constitui os dados das roupas, depois usamos o método map para criar uma nova propriedade em cada objeto caso o id da roupa adicionada ao carrinho seja igual ao id do objeto, se não for apenas retornamos o objeto e nada acontece
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id == id ? { ...item, ClothSize: e } : item
      )
    );
  
  };
    3 .Por fim use o contexto para renderizar as roupas no carrinho, fazendo isso a propriedade com os tamanhos será mostrada corretamente: 
    //
    const {clothes} = useContext(UserContext);

    //Por fim use o contexto para renderizar as roupas no carrinho: 
     {clothes.map(
            (data, index) =>
              ItemID.includes(data.id) ? (
                <div
                  key={index}
                  className="flex border-t-2 border-b-2 p-4 gap-3"
                >
                  <img src={data.imgSrc} alt="" className="w-1/4 md:w-1/12" />
                  <div className="w-full">
                    <p className="text-xs mb-5">{data.ClotheName}</p>
                    <div className="flex justify-between">
                      <div className="flex gap-5">
                        <p className="text-lg font-medium">
                          {data.ClothePrice}
                        </p>
                        <p className="border-2 border-black text-center w-8 h-8 bg-gray-200">
                          {data.ClothSize}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <input type="number" className="w-10 border-2" />
                        <button className="w-5">
                          <img
                            src="public/frontend_assets/bin_icon.png"
                            alt="A trash icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
          )}


    Como pode ver o tamanho é renderizado sem problemas 



    Mostrando apenas as roupas do usuário logado
    Primeiro vamos adicionar o tamanho selecionado da roupa ao item quando salva-lo no banco de dados.
    Na solicitação fetch onde adicionamos os dados das roupas salvas, adicione a propriedade size e o valor do tamanho selecionado, o body da solicitação deve parecer com esse: body: JSON.stringify({ id, owner: userInfo?.username, size:Size }),
    
    Agora Mude o modelos das orders para que ele fique assim:     
    id: { type: Number, required: true },
    owner: {type: String, required: true},
    size: {type: String, required: true},

    Depois de mudar o modelo, mude a solicitação no background que adiciona os dados das roupas salvas ao banco de dados, para que o size também seja salvo com o resto das informações da roupa: 
      const { id,owner,size } = req.body;

      const itemDoc = await OrderModel.create({ id, owner,size });



    
    Tento o tamanho salvo no banco de dados assim como as outras informações use um método fetch para pegar todos os itens salvos no banco de dados, depois pegue esses dados e os filtre da seguinte maneira: 
    const ids = data
          .filter((item: { owner: string }) => item.owner === userInfo.username)
          .map((item: { id: number; owner: string; size: string }) => ({
            id: item.id,
            owner: item.owner,
            size: item.size || "M",
          })); // Mapeia apenas os IDs

    Primeiro usamos o método filter para pegar apenas os itens salvos pelo usuário que esta logado no momento, em seguida usamos o método map nessa array filtrada e criamos array de objetos com as informações de cada item salvo, primeiro temos a propriedade id que usaremos para mostrar os itens salvos, depois o owner que usaremos para compara com o username do usuário logado e por fim temos a propriedade size que pega o tamanho da roupa.

    Depois de criamos essa array de objetos, a pegamos e colocamos ela no estado que usaremos para fazer as comparações: 
     const [Items, setItems] = useState<
    { id: number; owner: string; size: string }[]>([]);
    setItems(ids); // Atualiza o estado com os IDs


    Agora vamos para a parte onde renderizaremos os itens certos: 
    Para que apenas os itens que foram salvos pelo usuário sejam mostrados usaremos essa comparação:  
    Items.some((item) => item.id === data.id && item.owner === userInfo.username)

    Para mostrar o tamanho das roupas usaremos essa comparação: 
    {
      Items.find(
        (item) =>
          item.id === data.id &&
          item.owner === userInfo.username
      )?.size
    }.

    Por fim o código de renderização deve se parecer com esse: 
     {clothes.map((data, index) =>
            Items.some(
              (item) => item.id === data.id && item.owner === userInfo.username
            ) ? (
              <div key={index} className="flex border-t-2 border-b-2 p-4 gap-3">
                <img src={data.imgSrc} alt="" className="w-1/4 md:w-1/12" />
                <div className="w-full">
                  <p className="text-xs mb-5">{data.ClotheName}</p>
                  <div className="flex justify-between">
                    <div className="flex gap-5">
                      <p className="text-lg font-medium">{data.ClothePrice}</p>
                      <p className="border-2 border-black text-center w-8 h-8 bg-gray-200">
                        {
                          Items.find(
                            (item) =>
                              item.id === data.id &&
                              item.owner === userInfo.username
                          )?.size
                        }
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <input type="number" className="w-10 border-2" />
                      <button className="w-5">
                        <img
                          src="public/frontend_assets/bin_icon.png"
                          alt="A trash icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}

    Quando adicionamos um item ao banco de dados também vamos adicionar a propriedade owner, que possui como valor o username do usuário logado.
    Vamos passar o owner como propriedade dos objeto, assim como fizemos com o tamanho e depois apenas renderizar os itens que tiverem o owner igual ao usuário logado




    Um problema que apareceu é com o adicionamento de itens que já foram adicionados, em outras palavras só estou podendo adicionar o mesmo elemento uma única vez

    Vou fazer com que itens já salvos só possam ser salvos novamente caso o usuário seja diferentes.

  Como eu fiz para fazer com que o mesmo item possa ser salvo por usuários diferentes
  O primeiro passo é ir ao mongodb e ir nos clusters, de lá vá até o local onde as coleções ficam e depois selecione a coleção que guarda os itens, estando nessa coleção vá até indexes e delete o index com valor igual a id_1.

  Depois de deletar o index com o valor id_1 no mongodb, vamos atá o modelo dos itens(que nesse caso se chama de orders) e vamos adicionar um novo  Índice Composto : 
  // Define um índice composto para `id` e `owner`
OrderSchema.index({ id: 1, owner: 1 }, { unique: true });

O que é um indice composto?

Um índice composto é um índice que abrange mais de um campo em um banco de dados. Ele é usado para acelerar as consultas que filtram ou ordenam os dados com base em múltiplos critérios. No caso do MongoDB, os índices compostos ajudam a otimizar buscas que envolvem vários campos.

Por exemplo, se você criar um índice composto em owner e id, o MongoDB organiza os documentos em uma ordem baseada nesses dois campos. Assim, quando você faz uma consulta que envolve esses campos, o MongoDB pode buscar os documentos muito mais rápido.

Como ele funciona?
1.Primeiro campo no índice (no exemplo, owner) é o critério principal. Os documentos são ordenados primeiro por esse campo.
2.Segundo campo no índice (no exemplo, id) é o critério secundário. Para cada valor do campo principal (owner), os documentos são ordenados pelo campo secundário (id).

Por exemplo
Se o índice composto for { owner: 1, id: 1 }, ele organiza os documentos assim:

owner: "Alice", id: 1
owner: "Alice", id: 2
owner: "Bob", id: 1
owner: "Bob", id: 3


Mas por usamos 1?
No Mongodb o valor associado a um campo pode ser:
  1 para ordem crescente(A → Z ou menor para maior);
  -1 para ordem decrescente(Z → A ou maior para menor);


Então, quando criamos o índice { owner: 1, id: 1 }, estamos dizendo ao MongoDB para organizar:
1.Primeiro pelo campo owner em ordem alfabética crescente.
2.Dentro de cada owner, ordenar os documentos pelo campo id em ordem numérica crescente.


Por que usamos o  Indice composto no nosso caso?

Você precisava que o MongoDB permitisse itens com o mesmo id, desde que fossem de owner diferentes. Um índice composto { owner: 1, id: 1 } faz o seguinte:

1.Evita duplicatas desnecessárias para o mesmo usuário: Garante que um mesmo owner não possa ter dois itens com o mesmo id.
2.Permite duplicatas entre usuários diferentes: Diferentes valores de owner podem ter itens com o mesmo id.



Como calcular o máximo das compras do usuário:

Opções: 
Mandar o valor da roupa para o mongodb;
1.Usar o estado que pega as informações dos ids presentes e filtrar a array json para apenas pegar os itens adicionado ao carrinho 
2.pegar o valor da propriedade ClothPrice e soma-lo atá o ultimo item.

 O primeiro problema que eu vejo com o primeiro método é que, se eu colocar o valor das roupas no mongodb, o usuário não logado não será capaz de ver o preço total das roupa que ele adicionou ao carrinho.

 Vou usar o segundo método, já que o problema do usuário logado não acontecerá caso eu use esse método:
 Primeiro vamos mudar o ClothPrice e fazer com que ele seja um número ao invés de uma string como "$49"
 Depois vamos usar a propriedade ClothPrice que agora é um número para fazer a soma dos valores, mas como vamos fazer isso?
 Primeiro precisamos achar uma maneira de colocar os ids dos itens, sem que sejam apenas os dos usuários logados


Pensando bem, eu vou fazer dois métodos, um para o usuário logado e outro para que não esta logado:
 Para o logado eu vou pegar o estado com as informações dos itens salvos pelo usuário no mongodb e vou usar os ids para pegar apenas a propriedade ClothPrice desse itens e usar o valor da propriedade para fazer o calculo total.

 Para fazer o calculo do usuário não logado, vou simplesmente adicionar os ids dos itens clicados pelo usuário e vou colocar eles em um contexto(como fizemos antes) e com esses ids vamos fazer o calculo total de maneira parecida da qual fizemos com os usuários logados

 Como eu fiz para fazer o calculo total(usuários logados)
 
Eu criei uma função que faz o seguinte, Primeiro uma array é criada e ela recebe todos os itens presentes no carrinho
  É importante colocar a função dentro de um estado para que seu valor seja mudado dinamicamente:

  // useEffect para monitorar mudanças no estado
  useEffect(() => {
    console.log("Estado atualizado com os IDs:", Items);
  
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
        AddToCart = clothes.filter((data) =>
          ItemID.some((id) => id === data.id)
        );
      }
  
      // Cria uma array com os preços dos itens no carrinho
      const InTheCart = AddToCart.map((item) => item.ClothePrice);
  
      console.log("Itens no carrinho:", AddToCart);
      console.log("Preços no carrinho:", InTheCart);
  
      // Atualiza o estado total com a soma dos preços
      if (InTheCart.length > 0) {
        setTotal(InTheCart.reduce((a, b) => a + b));
      } else {
        setTotal(0); // Define como zero se nenhum item for encontrado
        setPlusFee(0); // Define como zero se nenhum item for encontrado
      }
    };
  
    Soma(); // Chama a função para calcular o total
  }, [Items, clothes, ItemID, userInfo]); // Adiciona dependências relevantes
    // A função Soma é executada sempre que a array dos itens adicionados pelo usuário não logado for atualizada, assim com a array dos itens pegos no banco de dados, também quando o usuário logar e quando os itens no carrinho forem alterados


Como mostrar o total do usuário não logado

Não existem muitas mudanças do método usado quando o usuário estiver logado, a única mudança é que ao inves de usamos uma array com os itens salvos no banco de dados, usaremos uma array que é uma contexto que salva o id dos itens colocados no carrinho pelo usuário não logado: 
Na mesma função Soma, caso o user na estiver conectado: 
      // A unica coisa que mudamos é o uso dos contexto para filtrar as roupas presentes, nesse caso usamos o contexto ItemID que possui o id dos itens adicionados ao carrinho quando o usuário na esta logado

      const AddToCart = clothes.filter((data) =>
        ItemID.some((id) => id === data.id)
      );

      const InTheCart = AddToCart.map((item) => item.ClothePrice);
      
      if (InTheCart.length > 0 ) {
        setTotal(() => InTheCart.reduce((a, b) => a + b));
      }


Como deletar os itens salvos pelo usuário desconectado

Filtrando a array/contexto que usamos para filtrar os itens presentes no carrinho.
Basta remover os itens com id igual ao enviado por parâmetro para a função de delete: 

  Caso o usuário não esteja logado  removemos o id com id igual ao passado como parâmetro para a função DeleteItem
 if(!userInfo.username) {
      setItemID((prevClothes) =>
        prevClothes.filter((id) => id !== ItemId)
      );
    }


      A funcionalidade de adicionar mais de um mesmo elemento ao carrinho
      
Como deve funcionar?
Quando o usuário clicar em uma roupa já adicionada ao carrinho, ao inves de adicionar uma mensagem de erro ele adicionar 1 a quantidade daquela roupa

Outra coisa é como eu vou mostrar o mesmo item com tamanho diferentes, por exemplo se o usuário adicionar uma roupa, mas mudar o tamanho escolhido, adicionaremos o mesmo itens com diferentes tamanhos , como eu faço para mostrar a mesma roupa com outro tamanho

Primeiro vamos adicionar a quantidade de cada roupa adicionada ao carrinho ao banco de dados:


Primeiro vamos atualizar o modelo das roupa para incluir o tamanho: 
const OrderSchema = new Schema(
  {
    // Definindo o campo "id" como um número
    id: { type: Number, required: true },
    owner: {type: String, required: true},
    size: {type: String, required: true},
    // Vamos adicionar a quantidade de um itens ao banco de dados
    quantity : {type:Number, required:true, default: 1}
  },
  {
    // Opção que cria automaticamente campos `createdAt` e `updatedAt`
    timestamps: true,
  }
);
Vamos chamar de quantity e vamos dar um valor inicial de 1


Agora vamos ao backend, na funcionalidade de criar um novo item, lá vamos fazer uma verificação para ver se o usuário tentou adicionar a mesma roupa com o mesmo tamanho ao banco de dados, se sim vamos fazer uma solicitação de update para incrementar o valor do quantity da roupa verificação em 1, caso contrario apenas criaremos um novo item no banco de dados.

A solicitação que cria os item e os salva no backend deve ficar dessa maneira: 

app.post("/addItem", async (req, res) => {
  console.log("Corpo da requisição:", req.body); // Para verificar o que está chegando
  const { id,owner,size,quantity } = req.body;

  try {
    // Para aumentar a quantidade de um itens já salvo no mongodb, precisamos primeiramente saber se o itens existe e se ele existir incrementaremos o valor da propriedade quantity do elemento e assim adicionamos mais um do mesmo elemento ao banco de dados
    const existingItem = await OrderModel.findOne({ id, size, owner });
    if(existingItem){
      await OrderModel.updateOne(
        { id, size, owner },
        { $inc: { quantity: 1 } }
      )
      res.status(200).json({ message: "Quantidade incrementada com sucesso!" });
    }else {
      const itemDoc = await OrderModel.create({ id, owner,size,quantity });
      res.status(200).json(itemDoc);
    }

  } catch (error) {
    console.error("Erro ao adicionar item:", error.message);
    res.status(400).json({ error: "Erro ao adicionar item", details: error.message });
  }
});





O que falta ser feito no projeto:
A funcionalidade de aumentar a quantidade de uma certa roupa:
Guardar o valor da quantidade do mesmo item(X);
Mostrar a quantidade (X)
Ser capaz de mudar o valor do quantity no front-end()
Faça com que sempre que o valor do input for mudado uma solicitação de update seja feita, atualizado o valor do quantity()
Faça isso usando o useEffect()
Ser capaz de fazer que a quantidade de uma certa roupa aumente o valor total das roupas no carrinho()

E se eu usar a solicitação que cria novos itens para atualizar o valor do quantity. 
 R: Não da para fazer isso, pois estamos usando um input e o usuário pode tanto aumentar o valor do quantity em 1, diminuir em 1 ou qualquer outro valor, o que inviabilisa o uso simples de incrementar um que a solicitação de criação de itens possui

Eu quero colocar o valor do quantity dos elementos em um estado, e quando o valor do estado for mudado o quantity daquele elemento deve ser atualizado para o valor alterado pelo input.

O problema que encontramos com a implementação do quantity no front-end é o mesmo que encontramos quando estava tentando mostrar o tamanho das roupas, que é a conexão entre o item e a propriedade que queremos mostrar, nesse caso é o quantity do elemento, como vamos mostrar e alterar o quantity daquele elemento?



O que eu quero fazer é pegar esse valor : value={ Items.find(
                        (item) =>
                          item.id === data.id &&
                          item.owner === userInfo.username
                      )?.quantity
                    }
e colocar ele em um estado e quando o valor do estado for mudado, o useEffect executa uma solicitação de update ao backend, onde ele manda o valor do estado para o backend para que ele seja usado para atualizar o valor do quantity do elemento

Eu quero que quando o valor do input seja alterado o valor do quantity seja atualizado para ser igual ao valor do input.
Então precisamos achar uma maneira de fazer com que o valor do input seja inicialmente igual ao valor do quantity e quando o valor do input for mudado esse novo valor deve ser o valor do quantity do item em questão.
Vamos tentar implementar essa funcionalidade usando uma array de objetos


Pegar o valor atualizado do quantity

O que eu faz fiz da funcionalidade de quantidade
Já fiz com que sempre que o valor do input mudasse o valor da propriedade quantity fosse alterado de acordo no banco de dados e também fiz com que a solicitação retornasse o item salvo, então podemos pegar todas as propriedade do item que deve o quantity atualizado como a propria propriedade quantity atualizada.

O que falta:
Ser capaz de relacionar a propriedade quantity com o seu item correto no front-end.(X)
Para fazer isso eu usei a mesma lógica para fazer o tamanho da roupas aparecerem:  {
                          Items.find(
                            (item) =>
                              item.id === data.id &&
                              item.owner === userInfo.username
                          )?.quantity
                        }

O problema com esse método é que o valor do quantity não é atualizado quando o valor do input é alterado, apenas quando o código é renderizado.
Para resolver esse problema eu apenas fiz com que sempre que o valor do input fosse alterado  os dados seriam pegos no banco de dados para renderizar os dados do item, fosse pegos novamente, assim o valor do quantity atualizado seria pego novamente, mas só que estaria atualizado para a versão mais atual: 
  useEffect(() =>{
    ShowAllItens();
  }, [inputValue])
Como pode ver eu simplesmente criei um estado o inputValue que recebe o valor do input sempre que ele for alterado, e com isso como eu coloquei ele no segundo parâmetro do useEffect, sempre que alteramos o valor do input, alteraremos o valor do estado e com isso executaremos a função que pega os dados sempre que o valor do input for mudado.

Mostrar o item atualizado dinamicamente, então se o valor do input mudar a propriedade quantity deve ser mostrada com seu valor atualizado(X)

Fazer com que a funcionalidade funcione com o usuário não logado

Diferente do usuário logado o não logado não pega todos no banco de dados, o que faz com que o método usado com o usuário logado não funcione.
Como a única coisa que o usuário não logado possui é o id dos elemetos que ele adicionou ao carrinho.
Então o que precisa ser feito é arrumar uma maneira de fazer com que o valor do quantity local seja atualizado conforme o valor do input for alterado e fazer com que cada input tenha o valor do quantity único.
Eu poderia criar uma função que recebe tanto o valor do input quanto o id do item, e criar uma array de objetos, onde cada objeto possui um quantity e o seu id como propriedade, para atualizar o valor do id daquele item o id seria verificado.
Vamos criar um estado sendo esse uma array de objeto, o usaremos para guardar o valor do quantity e o id do input que executar a função que receberar esses dois valores
