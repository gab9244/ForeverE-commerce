import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const apiURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
export const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);


  const login = async (ev: { preventDefault: () => void }) => {
    // Usamos preventDefault no evento de submit para fazer com que o formulário não seja enviado e com isso não recarregue a página
    ev.preventDefault();
    //Aqui estamos fazendo uma solicitação fetch POST, onde temos como objetivo mandar o username e password para o nosso backend e lá  solicitação pega os dados do body que mandamos e os usa para buscar por um usuário usando o username para fazer a busca , então usamos uma solicitação post não para mandar dados para o banco de dados, mas sim para mandar ao nosso backend os dados, já que solicitações do tipo Post podem mandar um body e é nesse body que mandamos os dados: req.body
    // `${apiURL}/LogIng`
    // http://localhost:3000/LogIng
    await fetch( `http://localhost:3000/LogIng`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      //É necessário adicionar credentials a solicitação para que possamos trabalhar com senhas
      credentials: "include",
    })
      .then((res) => {
        // Caso a solicitação seja um sucesso atualizaremos o estado que redireciona o usuário para a página principal do projeto e também atualizamos o contexto que armazena as informações do usuário logado adicionando o username ao contexto 
        if (res.ok) {
          setRedirect(true);
          setUserInfo((prev) => ({ ...prev, username }));
          return res.json();
        } else {
          alert(`Wrong credentials`);
        }
      })
      .catch((error) => {
        alert(`Wrong credentials, error ${error} happened `);
      });
  };
  // Caso o valor do estado redirect seja true mandamos o usuário para a home do projeto
  if (redirect == true) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="px-5">
      <div className="grid justify-items-center text-center w-full py-10">
        <h2 className="font-serif text-3xl border-b-2 border-black px-7  ">
          <span className="text-gray-400">L</span>OGIN
        </h2>
      </div>

      <form
        className="flex flex-col items-center  max-w-96 md:w-[90%] m-auto gap-2 "
        onSubmit={login}
      >
        <div className=" w-[90%]">
          <label htmlFor="username" className="cursor-pointer">
            <p className="text-center font-medium text-lg">Username</p>
            <input
              type="text"
              id="username"
              className="border-2 border-gray-400  p-2 w-full "
              placeholder="Username"
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
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
          </label>
        </div>
        <div className="flex justify-between w-[90%]">
          <span className="cursor-pointer text-gray-500">
            Forgot your password?
          </span>
          <Link to={"/SignUp"} className=" text-gray-500">
            Create Account
          </Link>
        </div>

        <div>
          <button className="bg-black text-white px-5 p-2" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
