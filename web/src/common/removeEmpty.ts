export const removeEmpty: any = (obj: any) => Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce(
        (acc, [k, v]) => {
            if (v instanceof Array) {
                v = v.map((av) => av === Object(av) ? removeEmpty(av): v);
            }
            return { ...acc, [k]: v === Object(v) && !(v instanceof Array) ? removeEmpty(v) : v }},
        {}
    );
