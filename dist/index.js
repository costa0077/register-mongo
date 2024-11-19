"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const handler_error_1 = __importDefault(require("./middleware/handler-error"));
const influencers_router_1 = __importDefault(require("./router/influencers-router"));
/**
ATIVIDADE PRÁTICA AVALIATIVA
Turma: 3B2
Alunos:
Gabriel Diniz Carreiro
Felipe Costa Lisboa
*/
const port = process.env.WS_PORT ?
    parseInt(process.env.WS_PORT) :
    3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/influencers", influencers_router_1.default);
app.use((0, handler_error_1.default)());
app.listen(port, () => {
    console.log(`Servidor web sendo executado na porta ${port}`);
});
