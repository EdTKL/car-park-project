import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Car } from "../models";
import './ParkingList.scss'
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCarList } from "../cars/carAPI";

// interface Props {
//   parkingList: Car[];
// }


const columns: GridColDef[] = [
  {
    field: "plate_num",
    headerName: "車牌",
    minWidth: 80,
    editable: false,
    flex: 1
  },
  {
    field: "vehicle_type",
    headerName: "車類",
    minWidth: 80,
    editable: false,
    flex: 1
  },

  {
    field: "time",
    headerName: "停泊時間",
    type: "time",
    minWidth: 100,
    editable: false,
    flex: 1
  },
  {
    field: "invoice_num",
    headerName: "收據編號",
    type: "number",
    minWidth: 100,
    editable: false,
    flex: 1
  },
  {
    field: "total_hours",
    headerName: "總時數",
    type: "number",
    minWidth: 60,
    editable: true,
    flex: 1
  },
  {
    field: "parked_hours",
    headerName: "時",
    type: "number",
    minWidth: 60,
    editable: true,
    flex: 1
  },
  {
    field: "parked_days",
    headerName: "日",
    type: "number",
    minWidth: 60,
    editable: true,
    flex: 1
  },
  {
    field: "parked_nights",
    headerName: "夜",
    type: "number",
    minWidth: 60,
    editable: true,
    flex: 1
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "number",
    minWidth: 100,
    editable: false,
    flex: 1
  },
];

const ParkingList = () => {
  // const carList = useAppSelector((state: RootState) => state.carState.carList);
  const carList = useCarList();
  const parkingList = useMemo(() => 
    carList.filter((car) => car.status === "parking"), [carList]);

    const [input, setInput] = useState<string>("");
    const [rows, setRows] = useState<Car[]>(parkingList);
  
    const cbSearch = useCallback(() => {
      const searchedList = parkingList.filter((car) => {
        return car.plate_num.toLowerCase().includes(input.toLowerCase());
      });
      setRows(searchedList);
    }, [parkingList, input]);
  
    useEffect(() => {
      cbSearch();
    }, [cbSearch]);
  
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Box sx={{ maxHeight: "85%", width: "100%" }}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ color: "success.main", fontWeight: "700" }}
          >
            現時停泊車輛
          </Typography>
          <div className="btns">
            <button>排序</button>
            <span>
              <input
                style={{ paddingLeft: "10px" }}
                placeholder="請輸入車牌號碼"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
              <Button>
                <SearchIcon fontSize="small" />
                搜尋
              </Button>
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
        </Box>
      </Paper>
    );

};

export default ParkingList;
