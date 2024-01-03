module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,less,css,scss}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      primaryColor: 'red'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
