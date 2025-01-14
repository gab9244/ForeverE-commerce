import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Layout } from "./Layout";
import { Collection } from "./Páginas/Collection";
import { About } from "./Páginas/About";
import { Contact } from "./Páginas/Contact";
import ClothesData from "./Util/Info.json";
import { Clothes } from "./Páginas/ClothesPage";
import { Login } from "./Páginas/Login";
import { SignUp } from "./Páginas/SignUp";
import { Cart } from "./Páginas/Cart";
import { UserContextProvider } from "./UserContext"

interface Cloth {
  imgSrc: string;
  altText: string;
  ClotheName: string;
  ClothePrice: string;
  Categorie: string;
  id: number;
}
const CollectionData: Cloth[] = ClothesData.CollectionData;

export const Pages = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={<Layout />}>
            <Route path="/Collection" element={<Collection />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            {CollectionData.map((data, index) => {
              return (
                <Route
                  key={index}
                  path={`${index + 1}`}
                  element={
                    <Clothes
                      imgSrc={data.imgSrc}
                      altText={data.altText}
                      ClotheName={data.ClotheName}
                      ClothePrice={data.ClothePrice}
                      Categorie={data.Categorie}
                      id={data.id}
                    />
                  }
                />
              );
            })}
            <Route path="/Cart" element={<Cart />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};
