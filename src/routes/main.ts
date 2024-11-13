import { Router } from "express";

const router = Router();

import { shortNewUrl, getUrl } from "../controllers/url.controllers";

router.get('/:shortUrl', getUrl)

router.post("/shorturl", shortNewUrl);

export default router;
