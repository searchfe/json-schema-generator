import { typeOf, infer, spec } from '../src/index.js';
import { expect } from 'chai';

describe('typeOf', function () {
    it('should detect boolean', function () {
        expect(typeOf(false)).to.equal('boolean');
    });
});

describe('infer', function () {
    it('should infer boolean', function () {
        expect(infer(false)).to.deep.equal({
            $schema: 'http://json-schema.org/draft-07/schema#',
            $id: 'http://example.org/root.json#',
            default: false,
            definitions: {},
            examples: [false],
            type: 'boolean',
            description: '',
            title: 'A boolean value'
        });
    });
    it('should infer simple object', function () {
        expect(infer({ name: 'harttle', age: 16, heightInMeters: 1.67 }, { title: 'Harttle Schema' })).to.deep.equal({
            $schema: 'http://json-schema.org/draft-07/schema#',
            $id: 'http://example.org/root.json#',
            definitions: {},
            type: 'object',
            title: 'Harttle Schema',
            description: '',
            required: ['name', 'age', 'heightInMeters'],
            properties: {
                name: {
                    $id: '#/properties/name',
                    type: 'string',
                    title: 'A string value',
                    description: '',
                    pattern: '^(.*)$',
                    examples: ['harttle'],
                    default: ''
                },
                age: {
                    $id: '#/properties/age',
                    type: 'integer',
                    title: 'An integer value',
                    description: '',
                    default: 0,
                    examples: [16]
                },
                heightInMeters: {
                    $id: '#/properties/heightInMeters',
                    type: 'number',
                    title: 'A number value',
                    description: '',
                    default: 0,
                    examples: [1.67]
                }
            }
        });
    });
    it('should infer object that one of it\'s keys is null', function () {
        expect(infer({ name: 'harttle', age: 16, hobbies: null }, { title: 'Harttle Schema' })).to.deep.equal({
            $schema: 'http://json-schema.org/draft-07/schema#',
            $id: 'http://example.org/root.json#',
            definitions: {},
            type: 'object',
            title: 'Harttle Schema',
            description: '',
            required: ['name', 'age', 'hobbies'],
            properties: {
                name: {
                    $id: '#/properties/name',
                    type: 'string',
                    title: 'A string value',
                    description: '',
                    pattern: '^(.*)$',
                    examples: ['harttle'],
                    default: ''
                },
                age: {
                    $id: '#/properties/age',
                    type: 'integer',
                    title: 'An integer value',
                    description: '',
                    default: 0,
                    examples: [16]
                },
                hobbies: {
                    $id: '#/properties/hobbies',
                    type: 'object',
                    title: 'An object value',
                    description: '',
                    required: [],
                    properties: {}
                }
            }
        });
    });
});

describe('spec', function () {
    it('should spec boolean', function () {
        expect(spec(false, { $id: '#/gender' })).to.deep.equal({
            $id: '#/gender',
            type: 'boolean',
            title: 'A boolean value',
            description: '',
            default: false,
            examples: [false]
        });
    });
    it('should spec null', function () {
        expect(spec(null, { $id: '#/nullObject' })).to.deep.equal({
            title: 'An object value',
            description: '',
            required: [],
            properties: {},
            $id: '#/nullObject',
            type: 'object'
        });
    });
    it('should spec string', function () {
        expect(spec('harttle', { $id: '#/name' })).to.deep.equal({
            $id: '#/name',
            type: 'string',
            title: 'A string value',
            description: '',
            default: '',
            pattern: '^(.*)$',
            examples: ['harttle']
        });
    });
    it('should spec number', function () {
        expect(spec(1.67, { $id: '#/height' })).to.deep.equal({
            $id: '#/height',
            type: 'number',
            title: 'A number value',
            description: '',
            default: 0,
            examples: [1.67]
        });
    });
    it('should spec integer', function () {
        expect(spec(16, { $id: '#/age' })).to.deep.equal({
            $id: '#/age',
            type: 'integer',
            title: 'An integer value',
            description: '',
            default: 0,
            examples: [16]
        });
    });
    it('should spec array', function () {
        expect(spec(['alice', 'bob'], { $id: '#/members' })).to.deep.equal({
            $id: '#/members',
            type: 'array',
            title: 'An array of items',
            description: '',
            items: {
                $id: '#/members/items',
                type: 'string',
                default: '',
                pattern: '^(.*)$',
                title: 'A string value',
                description: '',
                examples: ['alice']
            }
        });
    });
});
