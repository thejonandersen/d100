export function getTypedProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export const singularize = (word: string): string => {
    return word.endsWith('s') ? word.slice(0, -1) : word;
}

let rgxBracketToDot: RegExp;

export const sanitizePath =  (path: string | string[]): string[] => {
    path = path || [] as string[];
    return Array.isArray(path) ? path : path.replace(rgxBracketToDot || (rgxBracketToDot = /\[(\w+)\]/g), '.$1').split('.');
}

export const get = (obj: any, path: string): any => {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    return sanitizePath(path).reduce((acc, val) => acc && acc[val], obj);
}

export const set = (obj: any, path: string | string[], value: any) => {
    const [current,...rest] = sanitizePath(path);
    rest.length >= 1 ? set(obj[current] = obj[current] || {}, rest, value) : obj[current]= value;
    return obj;
}

export const isEqual = (x: any, y: any): boolean => {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => isEqual(x[key], y[key]))
    ) : (x === y);
}


