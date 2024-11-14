import UrlModel from '../schema/url'
import { UrlData } from '../types'

export const saveShortedUrl = async (
  urlData: UrlData
): Promise<string | undefined> => {
  try {
    const url = new UrlModel(urlData)
    await url.save()
    return url.shortUrl
  } catch (error) {
    return undefined
  }
}

export const shortUrlIsAvailable = async (
  shortUrl: string
): Promise<boolean> => {
  try {
    const url = await UrlModel.find({ shortUrl })
    if (url.length === 0) throw new Error()
    return false
  } catch (error) {
    return true
  }
}

export const searchUrl = async (
  shortUrl: string
): Promise<string | undefined> => {
  try {
    const url = await UrlModel.findOne({ shortUrl })
    if (url != null) {
      return url.url
    }
    return undefined
  } catch (error) {
    return undefined
  }
}
