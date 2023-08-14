import React, { useCallback, useEffect, useState } from "react";
import { Car } from "../models";
import "./CarList.scss";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { formatDate } from "../../app/format";

interface Props {
  carList: Car[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, width: 60 },
  {
    field: "plate_num",
    headerName: "車牌",
    width: 80,
    editable: false,
    cellClassName: 'plate-cell',
  },
  {
    field: "vehicle_type",
    headerName: "車類",
    width: 65,
    editable: false,
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
    editable: false,
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
    width: 130,
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
    field: "payment",
    headerName: "收費",
    type: "number",
    width: 70,
    editable: false,
    valueFormatter(params) {
      if (params.value === null) {
        return '計算中';
      } else {
       return `${params.value/100}`
      }
    }
  },
  {
    field: "status",
    headerName: "狀態",
    type: "string",
    width: 80,
    editable: false,
    valueFormatter(params) {
      if (params.value === 'parking') {
        return '停泊中';
      } else if (params.value === 'out'){
       return '已出車';
      }},
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "string",
    width: 100,
    editable: false,
  },
];

const CarList = ({ carList }: Props) => {
  const [input, setInput] = useState<string>("");
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
        p: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        borderRadius: 3,
      }}
    >
      <Box sx={{ height: "82%", width: "100%", mb: 0 }}>
        <Typography
          variant="h6"
          mb={0}
          ml={1}
          color="success.main"
          fontWeight={700}
        >
          進出車輛紀錄
        </Typography>
        <Box className="btns" mb={0.5}>
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
            <Button className="Button">
            <SearchIcon fontSize="small"/>
              搜尋
            </Button>
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
          columnHeaderHeight={40}
          rowHeight={40}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </Box>
    </Paper>
  );
};

export default CarList;
