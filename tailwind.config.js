/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "744px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      tablet: { min: "744px", max: "1279px" },
      desktop: { min: "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
        custom: ["var(--font-rokaf)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        blue: {
          200: "#3692FF",
        },
      },
    },
  },
  plugins: [],
};
