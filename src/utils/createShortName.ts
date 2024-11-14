import { shortUrlIsAvailable } from "../models/url";
const createShortName = async (): Promise<string> => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shortedUrl: string;
    do {
        shortedUrl = '';
        for (let i = 0; i < 6; i++) {
            shortedUrl +=
                characters[Math.floor(Math.random() * characters.length)];
        }
    } while (!(await shortUrlIsAvailable(shortedUrl)));
    return shortedUrl;
};

export default createShortName;
