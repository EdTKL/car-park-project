import React, { useCallback, useEffect, useState } from "react";
import { Car } from "../models";
import "./ParkingList.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { formatDate } from "../../app/format";

const columns: GridColDef[] = [
  {
    field: "plate_num",
    headerName: "車牌",
    minWidth: 100,
    editable: false,
    cellClassName: "plate-cell",
    headerAlign: 'center',
    align:'center'
    // flex: 1
  },
  {
    field: "vehicle_type",
    headerName: "車類",
    minWidth: 100,
    editable: false,
    valueFormatter(params) {
      if (params.value === "small_car") {
        return "小型車";
      } else if (params.value === "motorcycle") {
        return "電單車";
      }
    },
    headerAlign: 'center',
    align:'center'
    // flex: 1
  },

  {
    field: "time",
    headerName: "停泊時間",
    type: "time",
    valueFormatter(params) {
      if (!params.value) {
        return "計算中";
      } else {
        return formatDate(params.value);
      }
    },
    minWidth: 100,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align:'center'
  },
  {
    field: "invoice_num",
    headerName: "收據編號",
    type: "number",
    minWidth: 100,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align:'center'
  },
  // {
  //   field: "total_hours",
  //   headerName: "總時數",
  //   type: "number",
  //   valueFormatter(params) {
  //     if (params.value === null) {
  //       return "計算中";
  //     } else {
  //       return params.value;
  //     }
  //   },
  //   minWidth: 70,
  //   editable: true,
  //   flex: 1
  // },
  // {
  //   field: "parked_hours",
  //   headerName: "時",
  //   type: "number",
  //   valueFormatter(params) {
  //     if (params.value === null) {
  //       return 0;
  //     } else {
  //       return params.value;
  //     }
  //   },
  //   minWidth: 60,
  //   editable: true,
  //   flex: 1
  // },
  // {
  //   field: "parked_days",
  //   headerName: "日",
  //   type: "number",
  //   valueFormatter(params) {
  //     if (params.value === null) {
  //       return 0;
  //     } else {
  //       return params.value;
  //     }
  //   },
  //   minWidth: 60,
  //   editable: true,
  //   flex: 1
  // },
  // {
  //   field: "parked_nights",
  //   headerName: "夜",
  //   type: "number",
  //   valueFormatter(params) {
  //     if (params.value === null) {
  //       return 0;
  //     } else {
  //       return params.value;
  //     }
  //   },
  //   minWidth: 60,
  //   editable: true,
  //   flex: 1
  // },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "number",
    minWidth: 100,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align:'center'
  },
];

interface Props {
  parkingList: Car[];
}

const ParkingList = ({ parkingList }: Props) => {
  const [input, setInput] = useState<string>("");
  const [rows, setRows] = useState<Car[]>(parkingList);

  //set default sorting model
  const [sortModel, setSortModel] = React.useState([{field: 'time', sort: 'desc'}] as any);

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
        elevation={2}
        sx={{
          padding: "10px",
          height: "100%",
          width: "100%",
          borderRadius: '20px',
        }}
      >
        <Box sx={{ maxHeight: "90%", height: "90%", width: "100%" }}>
          <Typography
            variant="h6"
            mb={0}
            ml={1}
            color="success.main"
            fontWeight={700}
          >
            現時停泊車輛
          </Typography>
          <Box className="btns" mb={0.5} px='6px'>
            <div></div>
            {/* <button>排序</button> */}
            <span>
              <input
                style={{ paddingLeft: "10px" }}
                placeholder="請輸入車牌號碼"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
              <Button className="Button" >
                <SearchIcon fontSize="small" />
                搜尋
              </Button>
            </span>
          </Box>
  
          <DataGrid
            sx={{
              px: '6px',
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
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            disableRowSelectionOnClick
            disableColumnMenu
          />
        </Box>
    </Paper>
  );
};

export default ParkingList;
