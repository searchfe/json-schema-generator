import {typeOf, infer, spec} from '../src/index.js';
import {expect} from 'chai';

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
            examples: [ false ],
            type: 'boolean',
            title: 'A boolean value'
        });
    });
    it('should infer simple object', function () {
        expect(infer({name: 'harttle', age: 16}, {title: 'Harttle Schema'}))
        .to.deep.equal({
            $schema: 'http://json-schema.org/draft-07/schema#',
            $id: 'http://example.org/root.json#',
            definitions: {},
            type: 'object',
            title: 'Harttle Schema',
            required: ['name', 'age'],
            properties: {
                name: {
                    $id: '#/properties/name',
                    type: 'string',
                    title: 'A string value',
                    pattern: '^(.*)$',
                    examples: ['harttle'],
                    default: ''
                },
                age: {
                    $id: '#/properties/age',
                    type: 'integer',
                    title: 'An integer value',
                    default: 0,
                    examples: [16]
                }
            }
        });
    });
});

describe('spec', function () {
    it('should spec boolean', function () {
        expect(spec(false, {$id: '#/gender'})).to.deep.equal({
            $id: '#/gender',
            type: 'boolean',
            title: 'A boolean value',
            default: false,
            examples: [false]
        });
    });
    it('should spec string', function () {
        expect(spec('harttle', {$id: '#/name'})).to.deep.equal({
            $id: '#/name',
            type: 'string',
            title: 'A string value',
            default: '',
            pattern: '^(.*)$',
            examples: ['harttle']
        });
    });
    it('should spec array', function () {
        expect(spec(['alice', 'bob'], {$id: '#/members'})).to.deep.equal({
            $id: '#/members',
            type: 'array',
            title: 'An array of items',
            items: {
                $id: '#/members/items',
                type: 'string',
                default: '',
                pattern: '^(.*)$',
                title: 'A string value',
                examples: ['alice']
            }
        });
    });
});
