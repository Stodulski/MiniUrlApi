import { Request, Response } from 'express'
import { UrlEntry, UrlData } from '../types'
import isValidUrl from '../utils/isValidUrl'
import createShortName from '../utils/createShortName'

import { saveShortedUrl, searchUrl } from '../models/url'

export const shortNewUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const urlEntry: UrlEntry = req.body

    if (!isValidUrl(urlEntry.url)) {
      res.status(400).json({ status: 'Bad' })
      return
    }

    const shortUrl = await createShortName()
    const urlData: UrlData = {
      url: urlEntry.url,
      shortUrl
    }

    const isCreated: string | undefined = await saveShortedUrl(urlData)
    if (isCreated === undefined) {
      throw new Error('Could not shorten URL')
    }

    const serverUrl: string | undefined = req.get('host')

    if (serverUrl === undefined) {
      throw new Error('Server error')
    }
    const newShortUrl: string = `${req.protocol}://${serverUrl}/${isCreated}`
    res.status(201).json({ status: 'Ok', url: newShortUrl })
  } catch (error) {
    res.status(500).json({
      status: 'Bad',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred'
    })
  }
}

export const getUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const url = req.params.shortUrl
    const urlExist = await searchUrl(url)

    if (urlExist === undefined) {
      res.status(404).json({ message: 'Invalid URL' })
      return
    }

    const completeUrl = urlExist.startsWith('http')
      ? urlExist
      : `https://${urlExist}`

    res.status(302).redirect(completeUrl)
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred'
    })
  }
}
