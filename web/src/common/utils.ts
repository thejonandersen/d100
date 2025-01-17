export function getTypedProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export const getNestedPropByString = (obj: any, path: string): any => {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        const match = key.match(/(.+)\[(\d+)\]/);
        if (match) {
            const propName = match[1];
            const index = parseInt(match[2], 10);
            current = current[propName][index];
        } else {
            current = current[key];
        }
    }

    return current;
}

