/*
 * jsg07@1.0.0, https://github.com/harttle/json-schema-generator
 * (c) 2016-2018 harttle
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var specFor = {
    'object': function object(data, _ref) {
        var $id = _ref.$id,
            title = _ref.title;

        var keys = Object.keys(data);
        var schema = {
            title: title || 'An object value',
            required: keys,
            properties: {}
        };
        keys.forEach(function (key) {
            schema.properties[key] = spec(data[key], { $id: $id + '/properties/' + key });
        });
        return schema;
    },
    'array': function array(data, _ref2) {
        var $id = _ref2.$id;

        var schema = {
            title: 'An array of items'
        };
        if (data.length) {
            schema.items = spec(data[0], { $id: $id + '/items' });
        }
        return schema;
    },
    'boolean': function boolean(data) {
        return {
            title: 'A boolean value',
            default: false,
            examples: [data]
        };
    },
    'integer': function integer(data) {
        return {
            title: 'An integer value',
            default: 0,
            examples: [data]
        };
    },
    'string': function string(data) {
        return {
            title: 'A string value',
            default: '',
            pattern: '^(.*)$',
            examples: [data]
        };
    }
};

function infer(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var schema = spec(data, { $id: '#', title: options.title });
    schema.definitions = {};
    schema.$schema = options.$schema || 'http://json-schema.org/draft-07/schema#';
    schema.$id = options.$id || 'http://example.org/root.json#';
    return schema;
}

function spec(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var type = typeOf(data);
    var impl = specFor[type];
    var $id = options.$id;
    if (!impl) throw new Error('implementation for ' + type + ' not found');
    return Object.assign(impl(data, options), { $id: $id, type: type });
}

function typeOf(obj) {
    if (obj instanceof Array) return 'array';
    if (typeof obj === 'string' || obj instanceof String) return 'string';
    if (Number.isInteger(obj)) return 'integer';
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
}

exports.specFor = specFor;
exports.infer = infer;
exports.spec = spec;
exports.typeOf = typeOf;
//# sourceMappingURL=jsg07.common.js.map
