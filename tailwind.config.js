/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary:"#10375C",
      secondary:"#EB8317",
      tertiary:"#F4F6FF",
      white:"#FFFFFF",
      black:"#000000",
    },
    extend: {
      screens:{
        desktop:'1920px',
        laptop:'1280px',
        tabletLandscape:'1024px',
        tablet:'767px',
        mobile:'480px'
      },
      fontSize: {
        'h1': ['5rem', { lineHeight: '1.2', letterSpacing:'0', fontWeight:'700' }],
        'h2': ['4rem', { lineHeight: '1.2', letterSpacing:'0', fontWeight:'600' }],
        'h3': ['3rem', { lineHeight: '1.2', letterSpacing:'0', fontWeight:'500' }],
        'h4': ['2.5rem', { lineHeight: '1.3', letterSpacing:'0', fontWeight:'400' }],        
        'h5': ['2rem', { lineHeight: '1.5', letterSpacing:'0', fontWeight:'400' }],        
        'h6': ['1.5rem', { lineHeight: '1.5', letterSpacing:'0', fontWeight:'600' }],        
        'body': ['1.1rem', { lineHeight: '1.5', letterSpacing:'0', fontWeight:'600' }],        
      },
      fontFamily: {
        fira: 'Fira Code',
        muli: 'Muli',
      },
    },
  },
  plugins: [],
}