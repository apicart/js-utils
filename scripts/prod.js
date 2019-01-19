import banner from 'rollup-plugin-banner'

export default {
	input: 'src/utils.js',
	output: {
		file: 'dist/utils.js',
		format: 'umd',
		name: "Utils"
	},
	plugins: [
		banner('utils.js v<%= pkg.version %> \n(c) 2018-' + new Date().getFullYear() + ' <%= pkg.author %>\n Released under the MIT License.')
	]
};
