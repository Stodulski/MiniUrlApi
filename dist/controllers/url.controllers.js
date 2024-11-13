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
exports.getUrl = exports.shortNewUrl = void 0;
const isValidUrl_1 = __importDefault(require("../utils/isValidUrl"));
const createShortName_1 = __importDefault(require("../utils/createShortName"));
const url_1 = require("../models/url");
const shortNewUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlEntry = req.body;
        if (!(0, isValidUrl_1.default)(urlEntry.url))
            throw new Error("Invalid URL");
        let shortUrl = (0, createShortName_1.default)();
        let isAvailable = yield (0, url_1.shortUrlIsAvailable)(shortUrl);
        while (!isAvailable) {
            shortUrl = (0, createShortName_1.default)();
            isAvailable = yield (0, url_1.shortUrlIsAvailable)(shortUrl);
        }
        const urlData = {
            url: urlEntry.url,
            shortUrl,
        };
        const isCreated = yield (0, url_1.saveShortedUrl)(urlData);
        if (!isCreated)
            throw new Error("Could not shorten URL");
        const newShortUrl = `${req.protocol}://${req.get("host")}/${isCreated}`;
        res.status(200).json({ status: "Ok", url: newShortUrl });
    }
    catch (error) {
        res.status(400).json({
            status: "Bad",
            error: error instanceof Error
                ? error.message
                : "An unknown error occurred",
        });
    }
});
exports.shortNewUrl = shortNewUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.params.shortUrl;
        const urlExist = yield (0, url_1.searchUrl)(url);
        if (!urlExist)
            throw new Error("Invalid URL");
        res.status(200).json({ urlExist });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "An unknown error ocurred",
        });
    }
});
exports.getUrl = getUrl;
