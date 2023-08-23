import * as React from "react";
import { Grid } from "@mui/material";
import EditCarList from "../../features/edit/EditCarList";
import Layout from "../../features/bars/Layout";
import "./Editpage.scss"
import { useAppDispatch } from "../../app/hook";
import { fetchCars } from "../../features/cars/carSlice";

export default function EditPage() {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <Layout>
      <Grid container sx={{ margin: 0 }} style={{maxHeight: "100%", maxWidth: "98%"}}>
        <Grid item xs={12} justifyContent="center" alignItems="center" style={{maxHeight: "100%"}} >
            <EditCarList />
        </Grid>
      </Grid>
    </Layout>
  );
}
