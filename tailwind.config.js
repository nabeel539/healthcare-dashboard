/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Atelier Palette
        primary: "#006068",
        "primary-container": "#007b85",
        "primary-fixed": "#96f1fc",
        "primary-fixed-dim": "#7ad4df",
        "on-primary": "#ffffff",
        "on-primary-container": "#d5faff",
        "on-primary-fixed": "#001f23",
        "on-primary-fixed-variant": "#004f56",
        
        secondary: "#515f74",
        "secondary-container": "#d5e3fc",
        "secondary-fixed": "#d5e3fc",
        "secondary-fixed-dim": "#b9c7df",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#57657a",
        "on-secondary-fixed": "#0d1c2e",
        "on-secondary-fixed-variant": "#3a485b",
        
        tertiary: "#0055a8",
        "tertiary-container": "#256ec9",
        "tertiary-fixed": "#d6e3ff",
        "tertiary-fixed-dim": "#a9c7ff",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#eff3ff",
        "on-tertiary-fixed": "#001b3d",
        "on-tertiary-fixed-variant": "#00468c",
        
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        
        surface: "#f7f9fb",
        "surface-dim": "#d8dadc",
        "surface-bright": "#f7f9fb",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-variant": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-surface-variant": "#3e494a",
        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",
        "inverse-primary": "#7ad4df",
        
        background: "#f7f9fb",
        "on-background": "#191c1e",
        
        outline: "#6e797a",
        "outline-variant": "#bdc9ca",
        "surface-tint": "#006971",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        ambient: "0px 12px 32px rgba(25, 28, 30, 0.06)",
        card: "0px 4px 16px rgba(25, 28, 30, 0.04)",
      },
    },
  },
  plugins: [],
}
