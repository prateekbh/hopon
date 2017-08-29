const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    staticFileGlobs: [
      'build/*.css',
      'build/*.js',
			'build/*.html',
			'build/assets/logo.png',
    ],
    stripPrefix: 'build/',
		minify: true,
		navigateFallback: 'index.html',
    runtimeCaching: [{
      urlPattern: /.(wav|png)/,
      handler: 'cacheFirst'
    }],
		filename: 'sw.js',
		staticFileGlobsIgnorePatterns: [
			/polyfills(\..*)?\.js$/,
			/\.map$/,
			/push-manifest\.json$/,
			/.DS_Store/
		]
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}