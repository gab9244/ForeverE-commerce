import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const apiURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL


  const register = async (ev: { preventDefault: () => void }) => {
    //Usamos preventDefault para previnir que o formulario seja realmente enviado e com isso recarreque a página
    ev.preventDefault();
    //Usamos await para esperar uma resposta da solicitação que fizemos a api http://localhost:3000/Registration, lembre-se de que o primeiro parâmetro do fetch é a url para a api, como estamos no local o valor será algo como http://localhost:3000 e o resto da url deve ser igual ao valor da url que colocaremos na solicitação que faremos no backend, /Registration, caso a resposta seja positiva then retornar um alert com uma mensagem positiva, caso contrario catch retorna uma mensagem de erro.

    // Como segundo parâmetro do método fetch teremos um objeto com varias informações, no momento para o método funcionar mandaremos um objeto com:
    // method, que contém o método, nesse caso é POST, já que queremos enviar valores para o mongodb/banco de dados.
    // body, que contém o corpo da solicitação, nesse caso estamos enviando o username e password, pois queremos criar um novo usuário.
    // headers, é a propriedade que especifica o tipo dos dados que estamos enviando, fazemos isso para não haver problemas com o cors.

    await fetch(`${apiURL}/Registration`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        alert("You have been registrated");
        setRedirect(true);
      })
      .catch((error) => {
        alert(`Registration has fail error ${error} happened`);
      });
  };
  if (redirect == true) {
    return <Navigate to={"/Login"} />;
  }
  return (
    <div className="px-5">
      <div className="grid justify-items-center text-center w-full py-10">
        <h2 className="font-serif text-3xl border-b-2 border-black px-7  ">
          Sign Up
        </h2>
      </div>

      <form
        className="flex flex-col items-center  max-w-96 md:w-[90%] m-auto gap-2 "
        onSubmit={register}
      >
        <div className=" w-[90%]">
          <label htmlFor="username" className="cursor-pointer">
            <p className="text-center font-medium text-lg ">Username</p>
            <input
              type="text"
              id="username"
              className="border-2 border-gray-400  p-2 w-full "
              placeholder="Username"
              value={username}
              onChange={(ev) => {
                setUsername(ev.target.value);
              }}
            />
          </label>
        </div>
        <div className=" w-[90%]">
          <label htmlFor="password" className="cursor-pointer">
            <p className="text-center font-medium text-lg ">Password</p>
            <input
              type="password"
              id="password"
              className="border-2 border-gray-400 w-full p-2 "
              placeholder="Password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
          </label>
        </div>
        <div className="flex  w-[90%]">
          <Link to={"/Login"} className=" text-gray-500">
            Login
          </Link>
        </div>

        <div>
          <button className="bg-black text-white px-5 p-2" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
