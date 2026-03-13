export function toFirestore(obj: any): any {
    if (obj === null || obj === undefined) return { nullValue: null };
    if (typeof obj === 'string') return { stringValue: obj };
    if (typeof obj === 'number') {
        if (Number.isInteger(obj)) return { integerValue: obj.toString() }; // Firestore prefers string for 64-bit int
        return { doubleValue: obj };
    }
    if (typeof obj === 'boolean') return { booleanValue: obj };
    if (Array.isArray(obj)) return { arrayValue: { values: obj.map(toFirestore) } };
    if (typeof obj === 'object') {
        const fields: any = {};
        for (const [key, val] of Object.entries(obj)) {
            if (val !== undefined) fields[key] = toFirestore(val);
        }
        return { mapValue: { fields } };
    }
    return { nullValue: null };
}

export function fromFirestore(val: any): any {
    if (!val) return null;

    // Handle raw Firestore document response objects: { name, fields, createTime, ... }
    if ('fields' in val && !('mapValue' in val) && !('stringValue' in val)) {
        const obj: any = {};
        const fields = val.fields || {};
        for (const [k, v] of Object.entries(fields)) {
            obj[k] = fromFirestore(v);
        }
        return obj;
    }

    if ('stringValue' in val) return val.stringValue;
    if ('integerValue' in val) return Number(val.integerValue);
    if ('doubleValue' in val) return Number(val.doubleValue);
    if ('booleanValue' in val) return val.booleanValue;
    if ('nullValue' in val) return null;
    if ('timestampValue' in val) return val.timestampValue;
    if ('arrayValue' in val) return val.arrayValue.values ? val.arrayValue.values.map(fromFirestore) : [];
    if ('mapValue' in val) {
        const obj: any = {};
        const fields = val.mapValue.fields || {};
        for (const [k, v] of Object.entries(fields)) {
            obj[k] = fromFirestore(v);
        }
        return obj;
    }
    return null;
}
