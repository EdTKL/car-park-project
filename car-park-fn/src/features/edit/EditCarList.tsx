import React, { useState } from "react";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./EditCarList.scss";
import { Car } from "../models";
import SearchIcon from '@mui/icons-material/Search';

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, width: 50 },
  {
    field: "plate",
    headerName: "車牌",
    width: 80,
    editable: true,
  },
  {
    field: "type",
    headerName: "車類",
    width: 80,
    editable: true,
  },
  {
    field: "in_out",
    headerName: "進／出",
    width: 80,
    editable: true,
  },
  {
    field: "time",
    headerName: "時間",
    type: "time",
    width: 120,
    editable: false,
  },
  {
    field: "invoice",
    headerName: "收據編號",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "totalHrs",
    headerName: "總時數",
    type: "number",
    width: 80,
    editable: true,
  },
  {
    field: "parkedHrs",
    headerName: "時",
    type: "number",
    width: 70,
    editable: true,
  },
  {
    field: "parkedDays",
    headerName: "日",
    type: "number",
    width: 75,
    editable: true,
  },
  {
    field: "parkedNights",
    headerName: "夜",
    type: "number",
    width: 75,
    editable: true,
  },
  {
    field: "payment",
    headerName: "總收費",
    type: "number",
    width: 100,
    editable: true,
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "edited",
    headerName: "修改",
    width: 80,
    editable: false,
  },
];

export default function EditCarList() {
  const [search, setSearch] = useState("");
  const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);

  return (
    <Box sx={{ height: "85%", width: "100%" }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ color: "success.main", fontWeight: "700" }}
      >
        進出車輛紀錄
      </Typography>
      <div className="btns">
        <button>排序</button>
        <span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button><SearchIcon fontSize='small' />搜尋</button>
        </span>
      </div>

      <DataGrid
        sx={{
          borderRadius: 3,
          color: "info.main",
          border: "none",
          boxShadow: "none",
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "white",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.main",
            borderRadius: 2,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
          },
          "& .MuiDataGrid-row": {
            borderRadius: 2,
            "&:nth-of-type(even)": {
              backgroundColor: "#F1FFD3",
            },
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#FFE08A",
            borderRadius: 2,
          },
        }}
        rows={carList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
