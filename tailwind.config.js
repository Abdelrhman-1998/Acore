/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],

  theme: {
    extend: {
      colors:{
        white:'#fff',
        seaShell:"#F0F0F0",
        aqua:"#eff1fd",
        redWine:"#AF001D",
        blue:"#0c4dcb",
        gray:{
          100:'#c0c2ce',
          900:'#575756'
        },
        black:"#000",
      }
    },
  },
  plugins: [
    
  ],
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts}',
    ]
  },
}

