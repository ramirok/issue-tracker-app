module.exports = {
  purge: ["./**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      strokeWidth: {
        3: "3",
        4: "4",
        5: "6",
        6: "6",
        7: "7",
        8: "8",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      scale: ["active"],
    },
  },
  plugins: [],
};
