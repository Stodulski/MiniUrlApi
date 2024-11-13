"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createShortName = (length = 5) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
};
exports.default = createShortName;
