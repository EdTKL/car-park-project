import React, { useCallback, useEffect, useState } from "react";
import { Car } from "../models";
import "./CarList.scss";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

interface Props {
  carList: Car[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, minWidth: 50, flex: 1 },
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
    field: "in_out",
    headerName: "進／出",
    minWidth: 80,
    editable: false,
    flex: 1
  },
  {
    field: "time",
    headerName: "時間",
    type: "time",
    minWidth: 120,
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
    field: "payment",
    headerName: "收費",
    type: "number",
    minWidth: 80,
    editable: false,
    flex: 1
  },
  {
    field: "status",
    headerName: "狀態",
    type: "number",
    minWidth: 80,
    editable: false,
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

const CarList = ({ carList }: Props) => {
  
  const [input, setInput] = useState<string>("");
  // const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);

  const [rows, setRows] = useState<Car[]>(carList);

  const cbSearch = useCallback(() => {
    const searchedList = carList.filter((car) => {
      return car.plate_num.toLowerCase().includes(input.toLowerCase());
    });
    setRows(searchedList);
  }, [carList, input]);

  useEffect(() => {
    cbSearch();
  }, [cbSearch]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        //display: "flex",
        // flexDirection: "column",
        //height: "410px",
        //width: "100%",
        borderRadius: 3,
      }}
      style={{height: "100%"}}
    >
      <Box sx={{ height: "80%", width: "100%" }}>
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
              style={{ paddingLeft: "10px" }}
              placeholder="請輸入車牌號碼"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
          <Button>
            <SearchIcon fontSize='small' />搜尋
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

export default CarList;
