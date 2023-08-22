import * as React from "react";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Layout from "../../features/bars/Layout";
import { Grid } from "@mui/material";
import PowerBI from "../../features/stat/PowerBI";

export default function StatPage() {
  return (
    <Layout>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
            <PowerBI />
          </Grid>
        </Grid>
    </Layout>
  );
}
