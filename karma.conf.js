module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai'],
		browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],
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
			base: 'ChromeHeadless',
			flags: ['--no-sandbox']
		  }
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		concurrency: Infinity
	})
};
