import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  CSSObject,
  Container,
  Fab,
  Grid,
  // Paper,
  // Paper,
  Theme,
  styled,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { SidebarButton } from "../features/models";
import "../features/bars/Sidebar.scss";
import "../features/bars/Navbar.scss";
import Space from "../features/parking/Space";
import ParkingList from "../features/parking/ParkingList";

interface Props {
  sBarBtns: SidebarButton[];
  sBarBtns2: SidebarButton[];
}

let drawerWidth = 200;
// const appbarHeight = 64;

// const defaultTheme = createTheme();

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean | any;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ParkingPage({ sBarBtns, sBarBtns2 }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    drawerWidth = 200;
  };

  const handleDrawerClose = () => {
    setOpen(false);
    drawerWidth = 64;
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* navbar */}
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <Typography
            className="navbarCarparkName"
            variant="h6"
            noWrap
            component="div"
          >
            庇利街停車場
          </Typography>
          <div className="navbarButtons">
            <DarkModeOutlinedIcon />
            <LocalPhoneOutlinedIcon />
            <CalendarMonthOutlinedIcon />
            <NotificationsNoneOutlinedIcon />
            <Avatar className="staffProfile">俊</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      {/* floating button */}
      {open ? (
        <Fab
          className="fabExpanded"
          size="small"
          sx={{ zIndex: "tooltip", boxShadow: 3 }}
          onClick={handleDrawerClose}
        >
          <KeyboardArrowLeftIcon />
        </Fab>
      ) : (
        <Fab
          className="fabClosed"
          size="small"
          sx={{ zIndex: "tooltip", boxShadow: 3 }}
          onClick={handleDrawerOpen}
        >
          {" "}
          <KeyboardArrowRightIcon />
        </Fab>
      )}
      {/* sidebar */}
      <Drawer className="sidebar" variant="permanent" anchor="left" open={open}>
        <List>
          {open ? (
            <ListItem className="brand">
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontFamily: "Black Han Sans",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                GW
              </Typography>
            </ListItem>
          ) : (
            <ListItem>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontFamily: "Black Han Sans",
                  textAlign: "center",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  marginBottom: "75px",
                }}
              >
                GW
              </Typography>
            </ListItem>
          )}
          {sBarBtns.map((button, open) => (
            <ListItem key={button.key} disablePadding sx={{ width: 190 }}>
              <Link to={button.linkTo}>
                <ListItemButton
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                >
                  <div className="svg">{button.icon}</div>
                  <ListItemText
                    className="sidebarButtonText"
                    primary={button.primary}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <List>
          {sBarBtns2.map((button, open) => (
            <ListItem key={button.key} disablePadding sx={{ width: 190 }}>
              <Link to={button.linkTo}>
                <ListItemButton
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                >
                  <div className="svg">{button.icon}</div>
                  <ListItemText
                    className="sidebarButtonText"
                    primary={button.primary}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* content */}
      <Box
        component="main"
        sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
                <ParkingList />
              {/* <Paper sx={{
                p: 2,
                display: 'flex',
                // flexDirection: 'column',
                height: '85vh'
              }}
              ></Paper> */}
            </Grid>
            <Grid item xs={4}>
                {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '42.5vh' }}> */}
                    <Space />
                {/* </Paper> */}
              </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    // </ThemeProvider>
  );
}
