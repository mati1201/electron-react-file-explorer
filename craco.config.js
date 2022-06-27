const CracoAlias = require('craco-alias');

module.exports = {
  webpack: {
    configure: (webpackConfig) => ({
      ...webpackConfig,
      target: 'electron-renderer',
    }),
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
