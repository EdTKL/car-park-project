import React, {  useCallback, useEffect, useState } from "react";
// import { useAppSelector } from "../../app/hook";
// import { RootState } from "../../app/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./EditCarList.scss";
import { Car } from "../models";
import SearchIcon from '@mui/icons-material/Search';
import { useCarList } from "../cars/carAPI";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, width: 50, flex: 1 },
  {
    field: "plate_num",
    headerName: "車牌",
    width: 80,
    editable: true,
    flex: 1
  },
  {
    field: "vehicle_type",
    headerName: "車類",
    width: 80,
    editable: true,
    flex: 1
  },
  {
    field: "in_out",
    headerName: "進／出",
    width: 80,
    editable: true,
    flex: 1
  },
  {
    field: "time",
    headerName: "時間",
    type: "time",
    width: 120,
    editable: false,
    flex: 1
  },
  {
    field: "invoice_num",
    headerName: "收據編號",
    type: "number",
    width: 100,
    editable: false,
    flex: 1
  },
  {
    field: "total_hours",
    headerName: "總時數",
    type: "number",
    width: 80,
    editable: true,
    flex: 1
  },
  {
    field: "parked_hours",
    headerName: "時",
    type: "number",
    width: 70,
    editable: true,
    flex: 1
  },
  {
    field: "parked_days",
    headerName: "日",
    type: "number",
    width: 75,
    editable: true,
    flex: 1
  },
  {
    field: "parked_nights",
    headerName: "夜",
    type: "number",
    width: 75,
    editable: true,
    flex: 1
  },
  {
    field: "payment",
    headerName: "總收費",
    type: "number",
    width: 100,
    editable: true,
    flex: 1
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "number",
    width: 100,
    editable: false,
    flex: 1
  },
  {
    field: "edited",
    headerName: "修改",
    width: 80,
    editable: false,
    flex: 1
  },
];

const EditCarList: React.FC = () => {
  const [input, setInput] = useState<string>("");
  // const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);
  const carList = useCarList();
  
  const [rows, setRows] = useState<Car[]>(carList)

  const cbSearch = useCallback(
    ()=>{
      const searchedList = carList.filter((car) => {
        return car.plate_num.toLowerCase().includes(input.toLowerCase());
      });
      setRows(searchedList);
    },[carList, input]
  );

  useEffect(() => {
    cbSearch()
  },[cbSearch])

  return (
    <Paper 
      elevation={3} 
      sx={{
        borderRadius: 3,
        p: 2,}} 
      style={{maxHeight: "100%",}}
      >
      <Box sx={{ height: "80%", width: "100%" }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ color: "success.main", fontWeight: "700" }}
      >
        所有進出紀錄
      </Typography>
      <div className="btns">
        <button>排序</button>
        <span>
          <input
            style={{ paddingLeft: "10px" }}
            placeholder="請輸入車牌號碼"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
          ></input>
          <Button><SearchIcon fontSize='small' />搜尋</Button>
        </span>
      </div>

      <div className="eCarList" style={{ maxWidth: '100%', maxHeight: "100%" }}>
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
        rows={rows}
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
      </div>
      </Box>
      </Paper>
  );
};

export default EditCarList;