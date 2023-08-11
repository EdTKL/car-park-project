import * as React from "react";
import Box from "@mui/material/Box";
import {
  Container,
  Grid,
  Paper,
} from "@mui/material";
import EditCarList from "../../features/edit/EditCarList";
import Layout from "../../features/bars/Layout";

export default function EditPage() {

  return (
    <Layout>
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
      </Layout>
  );
}
