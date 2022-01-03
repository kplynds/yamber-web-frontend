import { adaptV4Theme, createTheme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      dark: "#181818",
      main: "#212121",
      light: "#3D3D3D",
    },
    secondary: {
      main: "#89CFF0",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
      disabled: "#AAAAAA"
    },
    action: {
      disabled: "#AAAAAA",
    },
  },
  typography: {
    fontFamily: ['"Ubuntu"', "sans-serif"].join(","),
  },
}));

export default theme;
