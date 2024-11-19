import express from "express";
import cors from "cors";
import handlerError from "./middleware/handler-error";
import influencersRouter from "./router/influencers-router";

/**
ATIVIDADE PRÁTICA AVALIATIVA
Turma: 3B2
Alunos:
Gabriel Diniz Carreiro
Felipe Costa Lisboa

para iniciar o projeto e para rodar o servidor 
 npx tsc
 node dist/index.js
 nome da extensão thunder client
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