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
  colors,
  fonts,
  styles: {
    global: {
      "html, body": {
        bg: "white",
        color: "gray",
        fontFamily: "body",
        fontSize: { base: "md", md: "lg" },
      },
    },
  },
});

export default CustomTheme;
