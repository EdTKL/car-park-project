import { Grid } from "@mui/material";
import * as React from "react";
import PriceEdit from "../../features/prices/PriceEdit";
import Layout from "../../features/bars/Layout";
//import EditSpace from "../../features/parking/EditSpace";
import "../../pages/Layout.scss"

export default function SetPrice () {

    return (
    <Layout>
      {/* <Grid container direction="row" xs={12} className='first-row' columnSpacing={{ sm: 1, lg: 1, xl: 3 }} sx={{ margin: 0 }} >
        <Grid item xs={6} justifyContent="center" alignItems="center" style={{height: "95%"}}>
          <Paper elevation={3} className="space-comp" sx={{borderRadius: "20px"}} style={{height: "100%"}} />
        </Grid>
        <Grid item xs={6} justifyContent="center" alignItems="center"></Grid>
      </Grid> */}
      <Grid container sx={{ margin: 0 }} style={{maxHeight: "100%", maxWidth: "98%"}}>
        <Grid item xs={12} justifyContent="center" alignItems="stretch" style={{height: "95%"}}>
          <PriceEdit />
        </Grid>
      </Grid>
    </Layout>
    )
}