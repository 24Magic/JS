var path = require('path')

module.exports = {
	entry: './app/index.js',
	output: {
		filename: '_bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}