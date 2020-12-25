import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4e43cc",
      contrastText: "#fff",
    },
    secondary: {
      main: "#cc8c43",
      contrastText: "#fff",
    },
  },
});

export default theme;