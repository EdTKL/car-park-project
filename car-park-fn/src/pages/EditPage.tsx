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
  Container,
  Grid,
  Paper,
} from "@mui/material";

import "../features/bars/Sidebar.scss";
import "../features/bars/Navbar.scss";
import EditCarList from "../features/edit/EditCarList";
import Navbar from "../features/bars/Navbar";
import Sidebar from "../features/bars/Sidebar";
import { sidebarButtonList1, sidebarButtonList2 } from "../variables/sidebarButtonLists";
import Collapse from "../features/bars/Collapse";

export default function EditPage() {

  return (
    <>
      <Collapse />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <Sidebar 
          sidebarButtonList1={sidebarButtonList1} 
          sidebarButtonList2={sidebarButtonList2} 
        />
        <Box
          component="main"
          sx={{
              flexGrow: 1,
              height: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Paper 
                elevation={3}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '720px',
                  borderRadius: 3
                }}
                >
                  <EditCarList />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
