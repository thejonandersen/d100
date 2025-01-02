export const capitalize = (text: string): String => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};