module.exports = api => {
  const platform = api.caller(caller => caller && caller.platform);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      platform === 'web' && 'react-native-web',  // Use correct web plugin
    ].filter(Boolean),
  };
};
