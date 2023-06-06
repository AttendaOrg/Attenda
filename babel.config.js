module.exports = function (api) {
  api.cache(true);
  const plugins = ['inline-dotenv'];

  if (process.env.NODE_ENV !== 'testing') {
    plugins.push('transform-inline-environment-variables');
  }
  plugins.push('react-native-reanimated/plugin');
  // console.log(plugins);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
