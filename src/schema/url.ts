import { Schema, model } from "mongoose";

import { UrlDataMongoDB } from "../types";

const urlSchema = new Schema<UrlDataMongoDB>({
    url: { type: String, required: true },
    shortUrl: { type: String, required: true },
});

const UrlModel = model<UrlDataMongoDB>("Url", urlSchema);

export default UrlModel;
