"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const games_controller_1 = __importDefault(require("../controller/games-controller"));
const gamesRouter = express_1.default.Router();
gamesRouter.post("/", games_controller_1.default.createGame);
gamesRouter.put("/:id", games_controller_1.default.updateGame);
gamesRouter.delete("/:id", games_controller_1.default.deleteGame);
gamesRouter.get("/", games_controller_1.default.getAllGames);
gamesRouter.get("/:id", games_controller_1.default.getOneGame);
exports.default = gamesRouter;
