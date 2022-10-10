const autoprefixer = require('autoprefixer');
const nesting = require('postcss-nesting');
const customMedia = require('postcss-custom-media')

const config = {
	plugins: [autoprefixer, nesting, customMedia]
};

module.exports = config;
