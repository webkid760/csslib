const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      autoprefixer: { 
       }
    }),
    tailwindcss
  ]
}
