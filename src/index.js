export const specFor = {
    'object': function (data, {$id, title}) {
        let keys = Object.keys(data || {});
        let schema = {
            title: title || 'An object value',
            description: '',
            required: keys,
            properties: {}
        };
        keys.forEach(key => {
            schema.properties[key] = spec(data[key], {$id: `${$id}/properties/${key}`});
        });
        return schema;
    },
    'array': function (data, {$id}) {
        let schema = {
            title: 'An array of items',
            description: ''
        };
        if (data.length) {
            schema.items = spec(data[0], {$id: `${$id}/items`});
        }
        return schema;
    },
    'boolean': function (data) {
        return {
            title: 'A boolean value',
            description: '',
            default: false,
            examples: [data]
        };
    },
    'integer': function (data) {
        return {
            title: 'An integer value',
            description: '',
            default: 0,
            examples: [data]
        };
    },
    'number': function (data) {
        return {
            title: 'A number value',
            description: '',
            default: 0,
            examples: [data]
        };
    },
    'string': function (data) {
        return {
            title: 'A string value',
            description: '',
            default: '',
            pattern: '^(.*)$',
            examples: [data]
        };
    }
};

export function infer (data, options = {}) {
    let schema = spec(data, {$id: '#', title: options.title});
    schema.definitions = {};
    schema.$schema = options.$schema || 'http://json-schema.org/draft-07/schema#';
    schema.$id = options.$id || 'http://example.org/root.json#';
    return schema;
}

export function spec (data, options = {}) {
    let type = typeOf(data);
    let impl = specFor[type];
    let $id = options.$id;
    if (!impl) throw new Error(`implementation for ${type} not found`);
    return Object.assign(impl(data, options), {$id, type});
}

export function typeOf (obj) {
    if (obj instanceof Array) return 'array';
    if (typeof obj === 'string' || obj instanceof String) return 'string';
    if (Number.isInteger(obj)) return 'integer';
    return typeof obj;
}
