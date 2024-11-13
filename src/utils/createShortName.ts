const createShortName = (length = 5): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(
        { length },
        () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
};

export default createShortName;
