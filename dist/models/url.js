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
exports.searchUrl = exports.shortUrlIsAvailable = exports.saveShortedUrl = void 0;
const url_1 = __importDefault(require("../schema/url"));
const saveShortedUrl = (urlData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = new url_1.default(urlData);
        yield url.save();
        return url.shortUrl;
    }
    catch (error) {
        return undefined;
    }
});
exports.saveShortedUrl = saveShortedUrl;
const shortUrlIsAvailable = (shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield url_1.default.find({ shortUrl });
        if (url.length === 0)
            throw new Error();
        return false;
    }
    catch (error) {
        return true;
    }
});
exports.shortUrlIsAvailable = shortUrlIsAvailable;
const searchUrl = (shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield url_1.default.findOne({ shortUrl });
        if (url) {
            return url.url;
        }
        return undefined;
    }
    catch (error) {
        return undefined;
    }
});
exports.searchUrl = searchUrl;
