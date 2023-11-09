export const persistLocalStorage = <T>(key: string, value: T) => {
    // avoid save user sensible info
    localStorage.setItem(key, JSON.stringify({...value}));
}

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}
