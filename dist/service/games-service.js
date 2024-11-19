"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GamesService {
    static validate(nome, produtora) {
        if (!nome) {
            throw new Error("O nome não pode ser nulo ou em branco");
        }
        if (!produtora) {
            throw new Error("A produtora não pode ser nula ou em branco");
        }
        if (typeof nome !== "string") {
            throw new Error("O nome deve ser um texto");
        }
        if (typeof produtora !== "string") {
            throw new Error("A produtora deve ser um texto");
        }
    }
}
exports.default = GamesService;
