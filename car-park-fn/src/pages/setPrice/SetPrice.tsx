import { Grid } from "@mui/material";
import * as React from "react";
import EditPrice from "../../features/prices/EditPrice";
import "../../features/bars/Layout.scss"
import Layout from "../../features/bars/Layout";

export default function SetPrice () {

    return (
    <Layout>
      <Grid container paddingX={2} sx={{ margin: 0 }} >
        <Grid item xs={12} justifyContent="center" >
          <EditPrice />
        </Grid>
      </Grid>
    </Layout>
    )
}