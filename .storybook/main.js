module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
  ],
  // Export a function. Accept the base config as the only param.
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve = {
      ...config.resolve,
      alias: {
        'react-native-svg': 'react-native-svg-web',
        '@storybook/react-native': '@storybook/react',
      },
    };

    // Return the altered config
    return config;
  },
};
