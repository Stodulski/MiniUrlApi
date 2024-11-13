"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidUrl = (url) => {
    try {
        if (typeof url !== "string")
            throw new Error();
        new URL(url);
        return true;
    }
    catch (_) {
        return false;
    }
};
exports.default = isValidUrl;
