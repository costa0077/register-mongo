"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const influencers_controller_1 = __importDefault(require("../controller/influencers-controller")); // Corrigir para o controlador de influenciadores
const influencersRouter = express_1.default.Router(); // Renomeia para influencersRouter
// Rota GET /influencers - Lista todos os influenciadores digitais
influencersRouter.get("/", influencers_controller_1.default.getAllInfluencers);
// Rota POST /influencers - Cria um novo influenciador digital
influencersRouter.post("/", influencers_controller_1.default.createInfluencer);
// Rota PUT /influencers/:id - Atualiza um influenciador digital
influencersRouter.put("/:id", influencers_controller_1.default.updateInfluencer);
// Rota DELETE /influencers/:id - Deleta um influenciador digital
influencersRouter.delete("/:id", influencers_controller_1.default.deleteInfluencer);
exports.default = influencersRouter;
