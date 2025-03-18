module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@components': './src/components/components.ts',
          '@screens': './src/screens/screens.ts',
          '@helpers': './src/helpers/helpers.ts',
          '@services': './src/services/services.ts',
          '@context': './src/context/context.ts',
          '@navigations': './src/navigations/navigations.ts',
          '@constants': './src/constants/constants.ts',
          '@assets': './src/assets/assets.ts',
          '@types': './src/types/types.ts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
