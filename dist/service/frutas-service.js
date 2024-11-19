"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class FrutasService {
    static validadeId(id) {
        try {
            return new mongodb_1.ObjectId(id);
        }
        catch (error) {
            throw new Error("O id é inválido!");
        }
    }
    static validade(fruta) {
        if (!fruta.nome) {
            throw new Error("Nome não pode ser nulo ou em branco!");
        }
        if (!fruta.valor) {
            throw new Error("Valor não pode ser nulo ou em branco!");
        }
        if (!fruta.unidade) {
            throw new Error("Unidade não pode ser nula ou em branco!");
        }
        if (typeof fruta.nome !== "string") {
            throw new Error("Nome deve ser um texto!");
        }
        if (typeof fruta.valor !== "number") {
            throw new Error("Valor deve ser um número!");
        }
        if (typeof fruta.unidade !== "string") {
            throw new Error("Unidade deve ser um texto!");
        }
        if (fruta.valor < 0) {
            throw new Error("Valor deve ser zero ou positivo!");
        }
        const unidades = ["kg", "saca", "pacote", "unidade"];
        if (!unidades.includes(fruta.unidade)) {
            throw new Error("Unidade deve ser válida!");
        }
    }
}
exports.default = FrutasService;
