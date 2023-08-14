import * as React from "react";
import "../../features/bars/Navbar.scss";
import "../../features/bars/Sidebar.scss";
import Layout from "../../features/bars/Layout";
import { Container, Grid } from "@mui/material";
import PowerBI from "../../features/stat/PowerBI";

export default function StatPage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PowerBI />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
