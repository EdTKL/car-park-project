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
      <Grid container spacing={1} paddingX={2} >
        <Grid item xs={12} >
            <EditCarList />
        </Grid>
      </Grid>
    </Layout>
  );
}
