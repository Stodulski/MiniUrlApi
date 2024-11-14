const isValidUrl = (url: string): boolean => {
    try {
        const testUrl = url.startsWith("http://") || url.startsWith("https://") 
            ? url 
            : `https://${url}`;
        
        new URL(testUrl);
        return true;
    } catch (error) {
        return false;
    }
};

export default isValidUrl;
