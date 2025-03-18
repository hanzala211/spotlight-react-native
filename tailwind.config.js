/** @type {import('tailwindcss').Config} */
const {COLORS} = require('./src/constants/colors.ts');
const {FONTS} = require('./src/assets/assets.ts');
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: COLORS,
      fontFamily: {
        poppinsBlack: [FONTS.poppinsBlack],
        poppinsBlackItalic: [FONTS.poppinsBlackItalic],
        poppinsBold: [FONTS.poppinsBold],
        poppinsBoldItalic: [FONTS.poppinsBoldItalic],
        poppinsExtraBold: [FONTS.poppinsExtraBold],
        poppinsExtraBoldItalic: [FONTS.poppinsExtraBoldItalic],
        poppinsExtraLightItalic: [FONTS.poppinsExtraLightItalic],
        poppinsItalic: [FONTS.poppinsItalic],
        poppinsLight: [FONTS.poppinsLight],
        poppinsLightItalic: [FONTS.poppinsLightItalic],
        poppinsMedium: [FONTS.poppinsMedium],
        poppinsMediumItalic: [FONTS.poppinsMediumItalic],
        poppinsRegular: [FONTS.poppinsRegular],
        poppinsSemiBold: [FONTS.poppinsSemiBold],
        poppinsSemiBoldItalic: [FONTS.poppinsSemiBoldItalic],
        poppinsThin: [FONTS.poppinsThin],
        poppinsThinItalic: [FONTS.poppinsThinItalic],
      },
    },
  },
  plugins: [],
};
