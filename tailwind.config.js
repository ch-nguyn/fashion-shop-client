/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
    colors: {
      fresh: "#0cc3ce",
      white: "#fff",
      black: "#000",
      gray: "gray",
      light: "#ccc",
      "extra-light": "#f1f1f1",
      dark: "#191919",
      error: "red",
      "light-fresh": "#e6fbfc",
      warn: "#ff9966",
      success: "#53a653",
      delivering: "#78bcc4",
    },
    backgroundImage: {
      "slider-1":
        "url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/Home-Shop-Slider-1.jpg')",
      "slider-2":
        "url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/Home-Shop-Slider-2.jpg')",
      "slider-3":
        "url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/Home-Shop-Slider-3.jpg')",
      "slider-4":
        "url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/Home-Shop-Slider-4.jpg')",
      "limited-shop":
        'url("https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/home-shop-1-parallax.jpg")',
      "home-banner":
        'url("https://suprema.qodeinteractive.com/wp-content/uploads/2016/02/home-shop-1-image-6.jpg?id=1753")',
      "hero-about":
        'url("https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/about-us-title-image.jpg")',
    },
    keyframes: {
      slider: {
        "0%": { opacity: 0 },
        "50%": { transform: "translateY(50%)", opacity: 0 },
        "100%": { transform: "translateY(0%)", opacity: 1 },
      },
      pulse: {
        "0%": { opacity: 0.4 },
        "50%": { opacity: 0.2 },
        "100%": { opacity: 0.4 },
      },
      slip: {
        "0%": { opacity: 0.4, transform: "translate(0,-50%)" },
        "100%": { opacity: 1 },
      },
    },
  },
  plugins: [],
};
