import AppBar from "@suid/material/AppBar";
import { ThemeProvider } from "@suid/material/styles";
import Typography from "@suid/material/Typography";
import { JiroTheme } from "./JiroTheme";

export const TitleBar = () => {
  return (
    <ThemeProvider theme={JiroTheme}>
      <AppBar position="static">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            padding: "0 0 0 10px",
          }}
        >
          ◯郎で学ぶテストコード
        </Typography>
      </AppBar>
    </ThemeProvider>
  );
};
