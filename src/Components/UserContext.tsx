/* eslint-disable @typescript-eslint/no-explicit-any */

//O context do React nada mais é do que uma maneira de passar dados para todos os componentes que forem embrulhados pelo UserContextProvider, nesse caso queremos passar as state variables userInfo e setUserInfo
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import ClothesData from "./Util/Info.json";
type UserInfoType = {
  username: string;
  password: string;
}
// Clothe é o formato dos objetos que constituem a array de objeto  que contém todos os dados das roupas
interface Clothe {
  imgSrc: string;
  altText: string;
  ClotheName: string;
  ClothePrice: number;
  Categorie: string;
  id: number;
  // Caso ClothSize não exista erros não vão acontece, fazemos isso, pois a propriedade só sera criada depois de colocamos alguma roupa no carrinho
  ClothSize?: string;
  owner?: string;
  // A quantidade de uma certa roupa
  quantity?: number;
  uniquekey?: string;
}

interface QuantitiesContext {
  id : number;
  quantityValue : number;
  uniquekey? : string;
}

interface ItemIDType { 
  id: number; 
  size: string ;
  uniqueKey: string;
  quantityValue : number;

}


// CollectionData nada mais é do que os dados do json tento seus tipos definidos
const CollectionData: Clothe[] = ClothesData.CollectionData;

// Define the shape of your user context
interface UserContextType {
  userInfo: UserInfoType;
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>;
  
  ItemID: ItemIDType[];
  setItemID: React.Dispatch<React.SetStateAction<ItemIDType[]>>

  clothes: Clothe[];
  setClothes: React.Dispatch<React.SetStateAction<Clothe[]>>

  quantities: QuantitiesContext[];
  setQuantities : React.Dispatch<React.SetStateAction<QuantitiesContext[]>>


  
}
interface UserContextProviderProps {
    children: ReactNode;
  }

// Create the context with an initial empty object
export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({children}: UserContextProviderProps) {
  const [userInfo,setUserInfo] = useState<UserInfoType>({ username: '', password: ''});
  const [ItemID, setItemID] = useState<ItemIDType[]>([]);
  const [clothes, setClothes] = useState<Clothe[]>(CollectionData);;
  // Quantities state with initialization from localStorage
  const [quantities, setQuantities] = useState<QuantitiesContext[]>(() => {
    const storedQuantities = localStorage.getItem("cartQuantities");
    try {
      return storedQuantities ? JSON.parse(storedQuantities) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return []; // Fallback to an empty array
    }
  });
  return (
    <UserContext.Provider value={{userInfo, setUserInfo, ItemID, setItemID,
      clothes, setClothes, quantities, setQuantities
    }}>
      {children}
    </UserContext.Provider>
  );
}
