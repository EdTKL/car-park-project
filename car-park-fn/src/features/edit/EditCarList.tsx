import React, {  useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./EditCarList.scss";
import { Car } from "../models";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { formatDate } from "../../app/format";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, width: 50, flex: 1 },
  {
    field: "plate_num",
    headerName: "車牌",
    width: 75,
    editable: true,
    cellClassName: 'plate-cell',
    flex: 1
  },
  {
    field: "vehicle_type",
    headerName: "車類",
    width: 70,
    editable: true,
    valueFormatter(params) {
      if (params.value === 'small_car') {
        return '小型車';
      } else if (params.value === 'motorcycle'){
       return '電單車';
      }},
    flex: 1
  },
  {
    field: "in_out",
    headerName: "進／出",
    minWidth: 65,
    editable: true,
    valueFormatter(params) {
      if (params.value === 'in') {
        return '進';
      } else {
       return '出';
      }},
    flex: 1
  },
  {
    field: "time",
    headerName: "時間",
    type: "time",
    minWidth: 130,
    editable: false,
    valueFormatter(params) {
      if (!params.value) {
        return '計算中';
      } else {
      return formatDate(params.value)
      }
    },
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
    width: 80,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
       return params.value;
      }
    },
    flex: 1
  },
  {
    field: "parked_hours",
    headerName: "時",
    type: "number",
    width: 70,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
        return params.value;
      }
    },
    flex: 1
  },
  {
    field: "parked_days",
    headerName: "日",
    type: "number",
    width: 70,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
        return params.value;
      }
    },
    flex: 1
  },
  {
    field: "parked_nights",
    headerName: "夜",
    type: "number",
    width: 70,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
        return params.value;
      }
    },
    flex: 1
  },
  {
    field: "payment",
    headerName: "總收費",
    type: "number",
    width: 100,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
       return `${params.value/100}`
      }
    },
    flex: 1
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "string",
    minWidth: 90,
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
  const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);
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
        borderRadius: '20px',
        p: 2,
        maxHeight: '100%',
      }} 
      >
      <Box sx={{ height: "80%", width: "100%" }}>
      <Typography
        variant="h6"
        mb={0}
        ml={1}
        color='success.main'
        fontWeight={700}
      >
        所有進出紀錄
      </Typography>
      <Box className="btns" mb={0.5}>
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
          <Button className="Button"><SearchIcon fontSize='small' />搜尋</Button>
        </span>
      </Box>

      <div className="eCarList" style={{ maxWidth: '100%', maxHeight: "100%" }}>
      <DataGrid
        sx={{
          borderRadius: 2,
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
        disableColumnMenu
      />
      </div>
      </Box>
      </Paper>
  );
};

export default EditCarList;