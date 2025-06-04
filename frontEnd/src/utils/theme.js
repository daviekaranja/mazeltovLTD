import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#24a0ed",
  },
};

const fonts = {
  heading: "'sans-serif', 'Lexend'",
  body: "'Lexend', sans-serif",
};

const CustomTheme = extendTheme({
  colors: {
    ...colors,
    background: {
      default: "#ffffff",
      subtle: "#f7fafc",
    },
    brand: {
      primary: "#24a0ed",
    },
    gray: {
      50: "#f9f9fb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  fonts,
  styles: {
    global: {
      "html, body": {
        bg: "#f1f5f9",
        color: "#1a202c",
        fontFamily: "body",
        fontSize: { base: "md", md: "lg" },
        lineHeight: "1.6",
        letterSpacing: "0.01em",
        transition: "background 0.2s",
      },
      "*": {
        boxSizing: "border-box",
      },
      a: {
        color: "brand.primary",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default CustomTheme;
