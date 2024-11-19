"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const mongodb_1 = require("mongodb");
const mongo_connection_1 = __importDefault(require("../db/mongo-connection"));
const games_service_1 = __importDefault(require("../service/games-service"));
class GamesController {
    static createGame(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, produtora } = req.body;
            try {
                games_service_1.default.validate(nome, produtora);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const games = db.collection("games");
                const data = {
                    nome,
                    produtora
                };
                yield games.insertOne(data);
                resp.status(201).json(data);
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static updateGame(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nome, produtora } = req.body;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                next(http_errors_1.default[400]("O id é inválido!"));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const games = db.collection("games");
                const data = yield games.find({ _id: objectId }).toArray();
                if (data.length === 0) {
                    next(http_errors_1.default[404]("O game com este id não existe no banco de dados"));
                    return;
                }
                try {
                    games_service_1.default.validate(nome, produtora);
                }
                catch (error) {
                    next(http_errors_1.default[400](error.message));
                    return;
                }
                yield games.updateOne({ _id: objectId }, {
                    $set: {
                        nome,
                        produtora
                    }
                });
                resp.status(200).json(yield games.findOne({ _id: objectId }));
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static deleteGame(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                next(http_errors_1.default[400]("O id é inválido!"));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const games = db.collection("games");
                const data = yield games.find({ _id: objectId }).toArray();
                if (data.length === 0) {
                    next(http_errors_1.default[404]("O game com este id não existe no banco de dados"));
                    return;
                }
                yield games.deleteOne({ _id: objectId });
                resp.status(204).send("");
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static getAllGames(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const games = db.collection("games");
                resp.status(200).json(yield games.find().toArray());
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static getOneGame(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                next(http_errors_1.default[400]("O id é inválido!"));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const games = db.collection("games");
                const data = yield games.find({ _id: objectId }).toArray();
                if (data.length === 0) {
                    next(http_errors_1.default[404]("O game com este id não existe no banco de dados"));
                    return;
                }
                resp.status(200).json(data[0]);
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
}
exports.default = GamesController;
