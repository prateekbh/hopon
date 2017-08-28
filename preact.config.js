const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    staticFileGlobs: [
      'build/*.css',
      'build/*.js',
    ],
    stripPrefix: 'build/',
		minify: false,
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