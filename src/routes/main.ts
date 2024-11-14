import { Router } from 'express'

import { shortNewUrl, getUrl } from '../controllers/url.controllers'

const router = Router()

router.get('/:shortUrl', getUrl)

router.post('/shorturl', shortNewUrl)

export default router
