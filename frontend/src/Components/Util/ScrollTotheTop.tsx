import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

// O componente ScrollToTop serve para fazer com que a barra de scroll sempre retorne para o topo da página quando irmos para outra página, já que por padrão componentes do React Router mantém a posição anterior do scroll
// O hook useLocation paga a URL atual o que é util caso quisemos executar alguma ação caso a URL mude
// Window representa a chanela do navegador, ela é o objeto global no ambiente do navegador, o que significa que usando esse objeto podemos acessar propriedades como: Tamanho da janela, URL atual, Armazenamento local, manipular a rolagem e etc. 

// console.log(window); Exibe todas as propriedades e métodos do objeto window
// console.log(window.location.href);  Mostra a URL atual
// Curiosidade: No navegador, você não precisa escrever window. explicitamente. Por exemplo, alert() é o mesmo que window.alert().

// Window.scrollTo seria a propriedade que representa a barra de scroll, então mudar seu valor para 0,0 significa mudar o valor da barra de scroll para seu valor inicial, em outras palavras mandar para o topo da página.

//Resumindo: ScrollToTop é um componente que pega o valor atual da URL e o usa no hook useEffect para executar um bloco de código que redefini o valor da barra de scroll para seu valor padrão sempre que a URL mudar (mudar a página).