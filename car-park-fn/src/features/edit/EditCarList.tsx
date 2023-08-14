import React, {  useCallback, useEffect, useState } from "react";
// import { useAppSelector } from "../../app/hook";
// import { RootState } from "../../app/store";
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

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, width: 65 },
  {
    field: "plate_num",
    headerName: "車牌",
    width: 80,
    editable: true,
    cellClassName: 'plate-cell',
  },
  {
    field: "vehicle_type",
    headerName: "車類",
    width: 80,
    editable: true,
    valueFormatter(params) {
      if (params.value === 'small_car') {
        return '小型車';
      } else if (params.value === 'motorcycle'){
       return '電單車';
      }},
  },
  {
    field: "in_out",
    headerName: "進／出",
    width: 65,
    editable: true,
    valueFormatter(params) {
      if (params.value === 'in') {
        return '進';
      } else {
       return '出';
      }},
  },
  {
    field: "time",
    headerName: "時間",
    type: "time",
    width: 150,
    editable: false,
    valueFormatter(params) {
    if (!params.value) {
      return '計算中';
    } else {
     return formatDate(params.value)
    }
  }
  },
  {
    field: "invoice_num",
    headerName: "收據編號",
    type: "number",
    width: 100,
    editable: false,
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
    }
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
    }
  },
  {
    field: "parked_days",
    headerName: "日",
    type: "number",
    width: 75,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
        return params.value;
      }
    }
  },
  {
    field: "parked_nights",
    headerName: "夜",
    type: "number",
    width: 75,
    editable: true,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
        return params.value;
      }
    }
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
    }
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "string",
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

const EditCarList: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);
  // const carList = useCarList();
  
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
    <Box sx={{ height: "90%", width: "100%", padding: 0}}>
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
        disableColumnMenu
      />
    </Box>
  );
};

export default EditCarList;