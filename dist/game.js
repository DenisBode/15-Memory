const STORAGE_KEY = 'memorySettings';
function readSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null)
        return null;
    return JSON.parse(raw);
}
const settings = readSettings();
console.log('Settings:', settings);
export {};
