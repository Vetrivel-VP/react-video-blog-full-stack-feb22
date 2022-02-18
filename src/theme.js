import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
export const theme = extendTheme({ config });
