const isValidUrl = (url: string): boolean => {
    try {
        if (typeof url !== "string") throw new Error();
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

export default isValidUrl
