import { Request, Response } from "express";
import { UrlEntry, UrlData } from "../types";
import isValidUrl from "../utils/isValidUrl";
import createShortName from "../utils/createShortName";

import { saveShortedUrl, shortUrlIsAvailable, searchUrl } from "../models/url";

export const shortNewUrl = async (req: Request, res: Response) => {
    try {
        const urlEntry: UrlEntry = req.body;
        if (!isValidUrl(urlEntry.url)) throw new Error("Invalid URL");
        let shortUrl: string = createShortName();
        let isAvailable: boolean = await shortUrlIsAvailable(shortUrl);
        while (!isAvailable) {
            shortUrl = createShortName();
            isAvailable = await shortUrlIsAvailable(shortUrl);
        }
        const urlData: UrlData = {
            url: urlEntry.url,
            shortUrl,
        };
        const isCreated: string | undefined = await saveShortedUrl(urlData);
        if (!isCreated) throw new Error("Could not shorten URL");
        const newShortUrl: string = `${req.protocol}://${req.get(
            "host"
        )}/${isCreated}`;
        res.status(200).json({ status: "Ok", url: newShortUrl });
    } catch (error) {
        res.status(400).json({
            status: "Bad",
            error:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        });
    }
};

export const getUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const url: string = req.params.shortUrl;
        const urlExist = await searchUrl(url);
        if (!urlExist) throw new Error("Invalid URL");
        console.log(urlExist)
        const completeUrl = urlExist.startsWith('http') ? url : `https://${urlExist}`;
        res.status(200).redirect(completeUrl);
    } catch (error) {
        res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error ocurred",
        });
    }
};
