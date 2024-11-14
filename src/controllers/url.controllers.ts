import { Request, Response } from "express";
import { UrlEntry, UrlData } from "../types";
import isValidUrl from "../utils/isValidUrl";
import createShortName from "../utils/createShortName";

import { saveShortedUrl, searchUrl } from "../models/url";

export const shortNewUrl = async (req: Request, res: Response) => {
    try {
        const urlEntry: UrlEntry = req.body;
        if (!isValidUrl(urlEntry.url)) {
            res.status(400).json({ status: "Bad" });
            return;
        }
        let shortUrl: string = await createShortName();
        const urlData: UrlData = {
            url: urlEntry.url,
            shortUrl,
        };
        const isCreated: string | undefined = await saveShortedUrl(urlData);
        if (!isCreated) throw new Error("Could not shorten URL");
        const newShortUrl: string = `${req.protocol}://${req.get(
            "host"
        )}/${isCreated}`;
        res.status(201).json({ status: "Ok", url: newShortUrl });
    } catch (error) {
        res.status(500).json({
            status: "Bad",
            error:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        });
    }
};

export const getUrl = async (req: Request, res: Response) => {
    try {
        const url = req.params.shortUrl;
        const urlExist = await searchUrl(url);

        if (!urlExist) {
            res.status(404).json({ message: "Invalid URL" });
            return;
        }

        const completeUrl = urlExist.startsWith("http")
            ? urlExist
            : `https://${urlExist}`;

        res.status(302).redirect(completeUrl);
    } catch (error) {
        res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        });
    }
};
