module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    port: 8080,
    browsers: [
      'Firefox'
    ],
    plugins: [
      'karma-firefox-launcher',
      'karma-jasmine'
    ],
    files: [
      './test/unit/**/*[sS]pec.js'
    ]
  });
};
