import { Document } from 'mongoose'

export interface UrlData {
  url: string
  shortUrl: string
}

export interface UrlDataMongoDB extends UrlData, Document {}

export type UrlEntry = Omit<UrlData, 'shortUrl'>
