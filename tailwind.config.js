module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  //https://tailwindcss.com/docs/adding-custom-styles#customizing-your-theme
  theme: {
    extend: {
      colors: {
        'cool-gray': '#1a1a1a',
        'dark-background' : '#0e0c0e'
      } 
    },
  },
  plugins: [],
}
