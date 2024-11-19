import express from "express";
import cors from "cors";
import handlerError from "./middleware/handler-error";
import influencersRouter from "./router/influencers-router";

/**
 * para iniciar o projeto e para rodar o servidor 
npx tsc
node dist/index.js
nome da extensão thunder client
mongod --dbpath <diretório de dados> // exemplo da sintaxe
mongod --dbpath C:\\Users\\zzz\\Documentos\\mongo-data
{
  "nome": "testeeeeee",
  "numerosSeguidores": 2000,
  "principalRedeSocial": "YouTube"
}
formato correto para adicionar o no bd
*/


const port = process.env.WS_PORT ?
    parseInt(process.env.WS_PORT) :
    3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/influencers", influencersRouter);
app.use(handlerError());

app.listen(port, () => {
    console.log(`Servidor web sendo executado na porta ${port}`);
});