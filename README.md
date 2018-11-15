# JSON Schema Generator

[![Build Status](https://travis-ci.org/harttle/json-schema-generator.svg?branch=master)](https://travis-ci.org/harttle/json-schema-generator)
[![Coverage Status](https://coveralls.io/repos/github/harttle/json-schema-generator/badge.svg?branch=master)](https://coveralls.io/github/harttle/json-schema-generator?branch=master)

Spec: http://json-schema.org/latest/json-schema-validation.html

## Install

```bash
apmjs install --save jsg
```

## Usage

```javascript
const jsg = require('jsg');

let schema = jsg.infer({
    name: 'Mike',
    male: true,
    tags: ['Gentle', 'Nice']
});
console.log(JSON.stringify(schema, null, 4));
```

## Output

```
{
    "title": "An object value",
    "required": [
        "name",
        "male",
        "tags"
    ],
    "properties": {
        "name": {
            "title": "A string value",
            "default": "",
            "pattern": "^(.*)$",
            "examples": [
                "Mike"
            ],
            "$id": "#/properties/name",
            "type": "string"
        },
        "male": {
            "title": "A boolean value",
            "default": false,
            "examples": [
                true
            ],
            "$id": "#/properties/male",
            "type": "boolean"
        },
        "tags": {
            "title": "An array of items",
            "items": {
                "title": "A string value",
                "default": "",
                "pattern": "^(.*)$",
                "examples": [
                    "Gentle"
                ],
                "$id": "#/properties/tags/items",
                "type": "string"
            },
            "$id": "#/properties/tags",
            "type": "array"
        }
    },
    "$id": "http://example.org/root.json#",
    "type": "object",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
}
```
