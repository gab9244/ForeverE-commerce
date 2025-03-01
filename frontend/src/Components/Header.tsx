import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
export const Header = () => {
  const [ShowM, setShowM] = useState(false);
  const location = useLocation();
  const [ActivePage, setActivePage] = useState("Home");
  const Show = () => {
    setShowM(!ShowM);
  };
  useEffect(() => {
    // Atualiza a página ativa com base no pathname atual
    switch (location.pathname) {
      case "/":
        setActivePage("Home");
        break;
      case "/Collection":
        setActivePage("Collection");
        break;
        case "/SignUp":
          setActivePage("Login");
          break;
      case "/Login":
        setActivePage("Login");
        break;
      case "/About":
        setActivePage("About");
        break;
      case "/Contact":
        setActivePage("Contact");
        break;
      default:
        setActivePage("Home");
    }
  }, [location.pathname]);
  return (
    <header className="flex items-center justify-between py-5 px-6 border-b-2">
      <div>
        <Link to={"/"}>
          <img
            src="\frontend_assets\logo.png"
            alt="Forever logo"
            className="Logo w-36"
          />
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {/* Só quando clicamos no icone de hambúrguer, tal icone só aparece no mobile*/}
        <div
          className={
            ShowM
              ? " md:hidden h-screen w-full absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-10"
              : "hidden"
          }
        >
          <div className="grid">
            <button
              onClick={Show}
              className="flex p-3 hover:bg-black hover:text-white"
            >
              {" "}
              BACK
            </button>
            <Link
              to={"/"}
              className="hover:bg-black hover:text-white p-3"
              onClick={Show}
            >
              HOME
            </Link>
            <Link
              to={"/Collection"}
              className="hover:bg-black hover:text-white p-3"
              onClick={Show}
            >
              COLLECTION
            </Link>
            <Link
              to={"/Login"}
              className="hover:bg-black hover:text-white p-3"
              onClick={Show}
            >
              LOGIN
            </Link>
            <Link
              to={"/About"}
              className="hover:bg-black hover:text-white p-3"
              onClick={Show}
            >
              ABOUT
            </Link>
            <Link
              to={"/Contact"}
              className="hover:bg-black hover:text-white p-3"
              onClick={Show}
            >
              CONTACT
            </Link>
          </div>
        </div>
        {/* aparecem no desktop */}
        <div className="hidden md:flex gap-5">
          <div className="flex gap-5">
            <Link
              to={"/"}
              className={ActivePage == "Home" ? "Activated" : "Off"}
            >
              HOME
            </Link>
            <Link
              to={"/Collection"}
              className={ActivePage == "Collection" ? "Activated" : "Off"}
            >
              COLLECTION
            </Link>
            <Link
              to={"/Login"}
              className={ActivePage == "Login" ? "Activated" : "Off"}
            >
              LOGIN
            </Link>
            <Link
              to={"/About"}
              className={ActivePage == "About" ? "Activated" : "Off"}
            >
              ABOUT
            </Link>
            <Link
              to={"/Contact"}
              className={ActivePage == "Contact" ? "Activated" : "Off"}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
      {/* Icones que aparecem no mobile */}
      <div className="flex gap-5">
        <Link to={"/Collection"}>
          <img
            src="\frontend_assets\search_icon.png"
            alt=" Search icon"
            className=" w-5 cursor-pointer"
          />
        </Link>
        <Link to={"/Login"}>
          <img
            src="\frontend_assets\profile_icon.png"
            alt="Profile icon"
            className=" w-5 cursor-pointer"
          />
        </Link>
        <Link to={"/Cart"}>
          <img
            src="\frontend_assets\cart_icon.png"
            alt="Cart icon"
            className=" w-5"
          />
        </Link>
        <img
          src="\frontend_assets\menu_icon.png"
          alt=" Menu icon"
          className="w-5 cursor-pointer md:hidden"
          onClick={Show}
        />
      </div>
    </header>
  );
};

// Eu tenho um menu hambúrguer, eu quero que ele apenas apareça caso o projeto esteja em mobile. O problema é que no pc o icone não aparece só os icones dentro do hambúrguer, mas se eu mudar o valor do hambúrguer para false e voltar para o pc não será possivel usar nenhum dos icones, porque eles não apareceram. Então o que eu preciso é

// Como implementar um menu H que apenas aparece no mobile e como fazer com que o menu não apareça no desktop e como fazer com que o mudar o valor do mobile não altere o estado dos icones no desktop.
