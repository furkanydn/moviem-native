module.exports = {
  project: {
    ios: {},
    android: {},
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx', 'js', 'jsx'];
  },
  assets: ['./app/assets/fonts/'], // Dizin altındakileri ortak kullanıma açmaktadır.
};
