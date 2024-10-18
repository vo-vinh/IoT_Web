import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {!isMobile && (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{ flex: 1, maxWidth: "400px" }}
        >
          <InputBase sx={{ ml: 3, flex: 3 }} placeholder="Search..." />
          <IconButton type="button" sx={{ p: 2 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}

      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>

        {isMobile && (
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
