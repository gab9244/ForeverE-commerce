const express = require("express");
//Cors é usado para simplificar o envio de dados entre varias fontes. É necessário usa-lo, pois os browsers geralmente dificultam o compartilhamento e envio de dados e é por isso que o usamos no express.use()
const cors = require("cors");
// Usaremos o bcryptjs mais tarde
const bcrypt = require("bcryptjs");
const app = express();

//Usamos salt para criptografar a senha
const salt = bcrypt.genSaltSync(10);
const secret = "fvdfg3434fgdff4dfher4teg";
// User é o modelo que usaremos para criar o user no banco de dados no mongodb
const User = require("./models/User.cjs");
const OrderModel = require("./models/Order.cjs");
const multer = require("multer"); //é necessário baixar o multer para que possamos passar multiplos dados para o mongodb
const connectDB = require("./db/connect.cjs");

// Baixe jsonwebtoken e cookie-parser
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.json()); // Permite que dados json sejam acertados no corpo da resposta
//Usamos os cookieParser() nas solicitações para os cookies sejam passados para as solicitações e com isso podemos usa-lo para mander o nosso projeto seguro
app.use(cookieParser());

// allowedOrigins é uma array com todas as url permitidas a enviarem dados para o backend do projeto, precisamos fazer isso para temos uma segurança nos envios de dados
const allowedOrigins = ["http://localhost:5173", "https://forever-e-commerce-owci.vercel.app","https://forever-e-commerce-owci.vercel.app", "https://forever-e-commerce-234x.vercel.app"];
// Usar essa função cors faz com que apenas solicitações que tiverem sido feitas por via das urls da array allowedOrigins sejam permitidas serem feitas
// app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Permite solicitações de origens na lista ou sem origem (ex.: ferramentas de desenvolvimento)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Permite envio de cookies e outras credenciais
    methods: "GET,POST,PUT,DELETE,OPTIONS,HEAD", // Define métodos HTTP permitidos
    allowedHeaders: "Content-Type, Authorization, X-Requested-With", // Define cabeçalhos permitidos
  })
);

//Essa solicitação post funciona da seguinte maneira. Primeiro pegamos do corpo da solicitação o username e a password, depois usamos try e catch e caso esses dados passem pelas especificações que fizemos no User.cjs enviamos um status de 200 e os dados ao banco de dados, caso contrario apenas retornamos status 400 e um json com o erro

app.post("/Registration", async (req, res) => {
  const { username, password } = req.body;
  try {
    //Usamos o método create do mongoose para criar um objeto com os dados da solicitação de post
    const userDoc = await User.create({
      //O objeto consistirar do nome do usuário e de uma senha hash que será gerada pela função hashSync da api de segurança bcrypt
      username,
      //Aqui usamos uma função hash para garantir a segurança do nosso projeto
      // Uma função hash é um algoritmo que transforma uma entrada (como uma senha) em uma saída fixa de comprimento específico (o hash)
      //O que estamos fazendo é pegar a senha e combina-la com o salt(Os 10 caracteres que sempre seram diferentes a cada utilização)
      password: bcrypt.hashSync(password, salt),
    });
    //Casos os dados passem pelas especificações que fizemos no schema do mongoose o objeto com os dados será enviado ao banco de dados no mongoDB
    res.status(200).json(userDoc);
  } catch (error) {
    //Se houver algum erro retornamos um status 404 com um json de erro
    res.status(404).json(error);
  }
});

// Vamos fazer o login agora
//Essa solicitação é usada para encontrar o usuário/objeto no banco de dados e retorna-lo
app.post("/LogIng", async (req, res) => {
  //Primeiro pegamos os dados do corpo da solicitação
  try {
    const { username, password } = req.body;
    // Em seguida usamos await para encontrar o usuário/objeto que possuir a propriedade username igual a que pegamos da solicitação
    const userDoc = await User.findOne({ username });
    //Com a senha em mãos a comparemos com a senha hash que mandamos para o banco de dados(é a senha mais o salt(10 digitos diferentes))
    const pass = bcrypt.compareSync(password, userDoc.password);
    //Caso pass seja true retornamos os dados
    if (pass) {
      jwt.sign(
        { username, id: userDoc._id }, //carga que será adicionada no token
        secret, //Secredo que será usado para assinar o token
        {}, //opções, nesse caso está vazio
        (error, token) => {
          //Função call back
          if (error) throw error; //Caso aconteça um error durante a criação do token
          res.cookie("token", token).json({
            //Manda o token como um cookie HTTP
            id: username._id, //Manda o id do usuário
            username, // Manda o nome do usuário
          });
        }
      );
    }
  } catch (error) {
    res.status(404).json(error); //Se houver um erro o retorne como json
  }
});

//Temos que usar upload.none() para que possamos mandar vários dados ao banco de dados e também o usamos, pois a nossa solicitação apenas contêm texto e nenhum arquivo

//upload.none() passa os campos de dados na solicitação e os torna disponíveis no req.body
//upload.none() é uma middleware usada para lidar com solicitações que apenas possuem texto de formulários enviados via FormData do frontend
app.post("/addItem", async (req, res) => {
  
  const { id, owner, size, quantity,uniqueKey } = req.body;
  console.log("Corpo da requisição:", req.body); // Para verificar o que está chegando
  try {
    // Para aumentar a quantidade de um itens já salvo no mongodb, precisamos primeiramente saber se o itens existe e se ele existir incrementaremos o valor da propriedade quantity do elemento e assim adicionamos mais um do mesmo elemento ao banco de dados
    // Esta primeira parte serve para atualizar o valor de uma roupa, guardando o novo valor no banco de dados
    const existingItem = await OrderModel.findOne({  owner,uniqueKey });
    if (existingItem) {
      await OrderModel.updateOne(
        { owner,uniqueKey },
        { $inc: { quantity: 1 } }
      );
      res.status(200).json({ message: "Quantidade incrementada com sucesso!" });
    } else {
      // Aqui é onde criamos um novo item
      // Não vamos mais mandar o id para o banco de dados já que ele faz com que um erro aconteça caso o id e o owner sejam o mesmo
      const itemDoc = await OrderModel.create({ id, owner, size, quantity, uniqueKey});
      res.status(200).json(itemDoc);
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao adicionar item", details: error.message });
  }
});

app.put("/updateQuantity/:uniqueKey/:inputValue", async (req, res) => {
  const { uniqueKey, inputValue } = req.params;
  try {
    // Vamos usar o método findOneAndUpdate para atualizar o item que queremos atualizar e também vamos usar ele, já que queremos que a variavel que usamos para executar o método tenha como valor o item que acabou de ser atualizado
    // O método findOneAndUpdate basicamente faz dois papeis em um, ele busca o item e se o encontrar  0 atualiza,
    const findItem = await OrderModel.findOneAndUpdate(
      { uniqueKey },
      { quantity: inputValue },
      { new: true }
    );

    // res.status(200).json({id:id, quantity: findItem.quantity});
    res.status(200).json(findItem.quantity)
  } catch (error) {
    console.log(
      "Error ao atualizar a quantidade do item",
      id,
      "Porque",
      error.message
    );
  }
});


// Mostre todos os itens em uma coleção
app.get("/getAllItems", async (req, res) => {
  try {
    // Busca todos os documentos na coleção por apenas chamar o método find no modelo OrderModel 
    const allItems = await OrderModel.find();
    res.status(200).json(allItems);
  } catch (error) {
    console.error("Erro ao buscar todos os itens:", error.message);
    res
      .status(500)
      .json({ error: "Erro ao buscar itens", details: error.message });
  }
});

// Esta é a solicitação de delete do projeto 
app.delete("/delete/:uniqueKey", async (req, res) => {
  // Primeiro pegamos a uniqueKey da roupa
  const { uniqueKey } = req.params;
  console.log(uniqueKey)

  try {
    // Em segui usamos a uniqueKey para deletar o item
    const DeleteOne = await OrderModel.findOne({ uniqueKey }).deleteOne();
    // Depois de ter deletado o item retornamos ele 
    
    res.status(200).json(DeleteOne);
  } catch (error) {
    console.log(
      "Error ao tentar deletar o itens, ",
      id,
      "Porque",
      error.message
    );
  }
});

// app.get("/addItem/:id", async (req, res) => {
//   console.log("Corpo da requisição:", req.body); // Para verificar o que está chegando
//   const { id } = req.params;
//   const idNumber = Number(id)
//   try {
//     const itemDoc = await OrderModel.find({ id: idNumber});
//     console.log(id)
//     res.status(200).json(itemDoc);
//   } catch (error) {
//     console.error("Erro ao adicionar item:", error.message);
//     res.status(400).json({ error: "Erro ao adicionar item", details: error.message });
//   }
// });



// port é a url do nosso backend, usamos uma variável ambiental, pois assim quando fizemos o deployment do projeto o valor dela pode ser alterado pelo lugar onde vamos fazer a hospedagem, caso esse valor não funcione ou etc, o valor de port será 4000
const port = process.env.PORT || 3000;
//start é uma função assíncrona que usa promise para nos conectar ao banco de dados no mongoDB
const start = async () => {
  try {
    // connectDB é uma função que importamos do componente connect que pega um url e tenta conecta-la ao banco de dados mongoDB
    // Nesse caso a url é a nossa variavel ambiental que possui como valor a url que nos conecta ao banco de dados do mongoDB
    await connectDB(process.env.MONGO_URI);
    //Para rodar o nosso backend usamos port que é uma variável que carrega como valor a variable ambiental PORT se ela existir caso contrario seu valor será 4000
    app.listen(port, () => {
      console.log(`Live on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
