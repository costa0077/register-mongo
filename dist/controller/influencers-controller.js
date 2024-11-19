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
const mongo_connection_1 = __importDefault(require("../db/mongo-connection"));
const http_errors_1 = __importDefault(require("http-errors"));
const influencer_service_1 = __importDefault(require("../service/influencer-service"));
const influencer_service_2 = __importDefault(require("../service/influencer-service"));
class InfluencersController {
    static getAllInfluencers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const influencers = db.collection("influencers");
                res.status(200).json(yield influencers.find().toArray());
            }
            catch (error) {
                next((0, http_errors_1.default)(500, error.message));
            }
        });
    }
    // Rota POST /influencers - Cria um novo influenciador digital
    static createInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const influencer = req.body;
            try {
                influencer_service_1.default.validade(influencer);
            }
            catch (error) {
                next((0, http_errors_1.default)(400, error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const influencers = db.collection("influencers");
                yield influencers.insertOne(influencer);
                res.status(201).json(influencer);
            }
            catch (error) {
                next((0, http_errors_1.default)(500, error.message));
            }
        });
    }
    static updateInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const influencer = req.body;
            let objectId;
            try {
                // Valida o ID
                objectId = influencer_service_1.default.validadeId(id);
            }
            catch (error) {
                next((0, http_errors_1.default)(400, "ID inválido."));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const influencers = db.collection("influencers");
                if ((yield influencers.countDocuments({ _id: objectId })) === 0) {
                    next(http_errors_1.default[404]("O influencer com esse id não existe no banco de dados!"));
                    return;
                }
                try {
                    influencer_service_1.default.validade(influencer);
                }
                catch (error) {
                    next(http_errors_1.default[400](error.message));
                    return;
                }
                yield influencers.updateOne({ _id: objectId }, {
                    $set: influencer
                });
                res.status(200).json(yield influencers.findOne({ _id: objectId }));
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static deleteInfluencer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let objectId;
            try {
                objectId = influencer_service_2.default.validadeId(id);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const influencers = db.collection("influencers");
                if ((yield influencers.countDocuments({ _id: objectId })) === 0) {
                    next(http_errors_1.default[404]("O influencer com esse id não existe no banco de dados!"));
                    return;
                }
                yield influencers.deleteOne({ _id: objectId });
                res.status(204).send("");
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
}
exports.default = InfluencersController;