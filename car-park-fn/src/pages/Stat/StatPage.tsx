import * as React from "react";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Layout from "../../features/bars/Layout";
import { Grid } from "@mui/material";
import PowerBI from "../../features/stat/PowerBI";

export default function StatPage() {
  return (
    <Layout>
        <Grid container m={1} spacing={2} >
          <Grid item xs={12} sx={{display: "flex"}}>
            <PowerBI />
          </Grid>
        </Grid>
    </Layout>
  );
}
