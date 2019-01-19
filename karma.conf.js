module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai'],
		files: [
			'dist/utils.js',
			'tests/stack-browser.js'
		],
		plugins: [
			'karma-chrome-launcher',
			'karma-chai',
			'karma-mocha'
		],
		reporters: ['progress'],
		customLaunchers: {
		  ChromeHeadlessNoSandbox: {
			base: 'Chrome',
			flags: ['--no-sandbox', '--dump-dom']
		  }
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		concurrency: Infinity
	})
};
