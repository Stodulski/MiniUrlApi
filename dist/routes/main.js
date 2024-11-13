"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const url_controllers_1 = require("../controllers/url.controllers");
router.get('/:shortUrl', url_controllers_1.getUrl);
router.post("/shorturl", url_controllers_1.shortNewUrl);
exports.default = router;
