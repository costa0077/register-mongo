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
const frutas_service_1 = __importDefault(require("../service/frutas-service"));
class FrutasController {
    static getAllFrutas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const frutas = db.collection("frutas");
                res.status(200).json(yield frutas.find().toArray());
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static createFruta(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const fruta = req.body;
            try {
                frutas_service_1.default.validade(fruta);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const frutas = db.collection("frutas");
                yield frutas.insertOne(fruta);
                res.status(201).json(fruta);
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static updateFruta(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const fruta = req.body;
            let objectId;
            try {
                objectId = frutas_service_1.default.validadeId(id);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const frutas = db.collection("frutas");
                if ((yield frutas.countDocuments({ _id: objectId })) === 0) {
                    next(http_errors_1.default[404]("A fruta com esse id não existe no banco de dados!"));
                    return;
                }
                try {
                    frutas_service_1.default.validade(fruta);
                }
                catch (error) {
                    next(http_errors_1.default[400](error.message));
                    return;
                }
                yield frutas.updateOne({ _id: objectId }, {
                    $set: fruta
                });
                res.status(200).json(yield frutas.findOne({ _id: objectId }));
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
    static deleteFruta(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let objectId;
            try {
                objectId = frutas_service_1.default.validadeId(id);
            }
            catch (error) {
                next(http_errors_1.default[400](error.message));
                return;
            }
            try {
                const conn = yield mongo_connection_1.default.getInstace();
                const db = conn.db("devweb");
                const frutas = db.collection("frutas");
                if ((yield frutas.countDocuments({ _id: objectId })) === 0) {
                    next(http_errors_1.default[404]("A fruta com esse id não existe no banco de dados!"));
                    return;
                }
                yield frutas.deleteOne({ _id: objectId });
                res.status(204).send("");
            }
            catch (error) {
                next(http_errors_1.default[500](error.message));
            }
        });
    }
}
exports.default = FrutasController;
