import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#181818",
      main: "#212121",
      light: "#3D3D3D",
    },
    secondary: {
      main: "#4e43cc",
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
});

export default theme;
