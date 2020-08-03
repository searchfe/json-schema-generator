import shim from 'rollup-plugin-shim';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';
import nodeResolve from 'rollup-plugin-node-resolve';

const fake = { fs: 'export default {}', path: 'export default {}' };
const version = process.env.VERSION || pkg.version;
const sourcemap = true;
const banner = `/*
 * jsg07@${version}, https://github.com/harttle/json-schema-generator
 * (c) 2016-${new Date().getFullYear()} harttle
 * Released under the MIT License.
 */`;
const treeshake = {
    propertyReadSideEffects: false
};
const input = 'src/index.js';

const babelConf = {
    babelrc: false,
    presets: [['@babel/env', { modules: false }]],
    plugins: ['@babel/plugin-external-helpers']
};

export default [{
    output: [{
        file: 'dist/jsg07.common.js',
        name: 'jsg07',
        format: 'cjs',
        sourcemap,
        banner
    }],
    external: ['path', 'fs'],
    plugins: [
        nodeResolve(),
        babel(babelConf)
    ],
    treeshake,
    input
}, {
    output: [{
        file: 'dist/jsg07.js',
        name: 'jsg07',
        format: 'umd',
        sourcemap,
        banner
    }],
    plugins: [
        shim(fake),
        alias({
            './template': './template-browser'
        }),
        nodeResolve(),
        babel(babelConf)
    ],
    treeshake,
    input
}, {
    output: [{
        file: 'dist/jsg07.min.js',
        name: 'jsg07',
        format: 'umd',
        sourcemap
    }],
    plugins: [
        shim(fake),
        nodeResolve(),
        babel(babelConf),
        uglify()
    ],
    treeshake,
    input
}];
