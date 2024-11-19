"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class InfluencersService {
    static validadeId(id) {
        try {
            return new mongodb_1.ObjectId(id);
        }
        catch (error) {
            throw new Error("O ID é inválido!");
        }
    }
    static validade(influencer) {
        if (!influencer.nome) {
            throw new Error("Nome não pode ser nulo ou em branco!");
        }
        if (typeof influencer.nome !== "string") {
            throw new Error("Nome deve ser um texto!");
        }
        if (!influencer.numerosSeguidores && influencer.numerosSeguidores !== 0) {
            throw new Error("Número de seguidores não pode ser nulo ou em branco!");
        }
        if (typeof influencer.numerosSeguidores !== "number") {
            throw new Error("Número de seguidores deve ser um número!");
        }
        if (influencer.numerosSeguidores < 0) {
            throw new Error("Número de seguidores deve ser zero ou positivo!");
        }
        if (!influencer.principalRedeSocial) {
            throw new Error("Principal rede social não pode ser nula ou em branco!");
        }
        if (typeof influencer.principalRedeSocial !== "string") {
            throw new Error("Principal rede social deve ser um texto!");
        }
        const redesValidas = ["Instagram", "YouTube", "TikTok", "Twitter", "Facebook"];
        if (!redesValidas.includes(influencer.principalRedeSocial)) {
            throw new Error("Rede social inválida! As opções válidas são: Instagram, YouTube, TikTok, Twitter e Facebook.");
        }
    }
}
exports.default = InfluencersService;
