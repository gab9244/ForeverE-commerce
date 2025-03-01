// Um observação que eu posso fazer e que você talvez tenha percebido é que eu defino o tipo duas fezes uma usando LocalStorageP e a outra é quando eu defino o tipo das promps que a função recebe, mas é possível fazer esse processo uma única vez, se eu remover as definições na função e usar o type LocalStorageP para definir os tipos dos promps só preciso definir o type é pronto certo? Errado, se eu fizer isso eu teria que definir o tipo das promps no componente pai que estar mandando as promps para o componente filho(se já não foram definidas lá), então dessa maneira eu diminuo o tamanho do código que seria escrito no componente pai por ter que definir o tipo das promps enquanto as envia para cá.
// LocalStorageP 
type LocalStorageP = {
    chave:string;
    id:number;
    size: string | undefined
}

// O componente updateLocalStorage é uma função que recebe a chave que queremos deletar do armazenamento local, o id para deletar o objeto especifico dentro da chave e por fim o tamanho da roupa para que itens com o mesmo id não sejam deletados se não tiverem o mesmo tamanho

export const updateLocalStorage = (chave:string, id:number, size:string | undefined) => {
  // 1. Pegue a chave
    const storedData = localStorage.getItem(chave);
    // Se a chave não for encontrada pare o código por aqui
    if (!storedData) return;
    try {
      // 2. Transforme a chave de string para array usando o método parse do JSON
      const parsedData = JSON.parse(storedData);
      // 3. Filtre a chave que transformamos em array sem o item que queremos deletar 
      const updatedData = parsedData.filter(
        (item: LocalStorageP) => !(item.id === id && item.size === size)
      );
      // 4. Atualize a chave com essa nova array sem o item deletado
      localStorage.setItem(chave, JSON.stringify(updatedData));
      console.log(updatedData)
    } catch (error) {
      console.error("Erro ao atualizar LocalStorage:", error);
    }
  };