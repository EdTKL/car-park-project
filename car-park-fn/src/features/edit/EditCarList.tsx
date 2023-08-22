import React, {  useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridEventListener, GridPreProcessEditCellProps, GridRowEditStopReasons, GridRowModel } from "@mui/x-data-grid";
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
import EditCarModal from "./DialogEditCar";

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
    editable: false,
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
    editable: false,
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
    editable: false,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      let hasError;
      if (params.props.value===null || params.props.value < 0) {
        hasError = true
      }
      return { ...params.props, error: hasError };
    },
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
    editable: false,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      let hasError;
      if (params.props.value===null || params.props.value < 0) {
        hasError = true
      }
      return { ...params.props, error: hasError };
    },
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
    editable: false,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      let hasError;
      if (params.props.value===null || params.props.value < 0) {
        hasError = true
      }
      return { ...params.props, error: hasError };
    },
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
    editable: false,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      let hasError;
      if (params.props.value===null || params.props.value < 0) {
        hasError = true
      }
      return { ...params.props, error: hasError };
    },
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
    editable: false,
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
    headerName: "曾修改",
    width: 80,
    editable: false,
    valueFormatter(params) {
      if (params.value === true) {
        return '是';
      } else {
       return null
      }
    },
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

  //modal
  const [open, setModalOpen] = React.useState(false);
  //close
  const handleModalClose = () => {
    setModalOpen(false);
  }
  //open
  const [cars, setCars] = React.useState(carList as any)
    const handleModalOpen = (newRow: GridRowModel) => {
      //console.log(newRow)
      switch (newRow.in_out) {
        case "out" : 
        setModalOpen(true);
        processRowUpdate(newRow)
        break;
        case "in" : 
          if (newRow.parked_days !== null || newRow.parked_hours !== null || newRow.parked_nights !== null || newRow.total_hours !== null) {
            newRow.parked_days = null;
            newRow.parked_hours = null;
            newRow.parked_nights = null;
            newRow.total_hours = null;
            setCars(cars.map((car: GridRowModel) => (car.id === newRow.id ? newRow : car)));
            setModalOpen(false)
          } else {
            setModalOpen(true);
            processRowUpdate(newRow)
          }  
      }
      return newRow
    };
  //handle inline edit submission
  const [modalValue, setModalValue] = React.useState({} as any)
  const processRowUpdate = (newRow: GridRowModel) => {
    setModalValue(newRow)
  }
  //discard unsubmitted changes
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

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
        onRowEditStop={handleRowEditStop}
        processRowUpdate={handleModalOpen}
        //isCellEditable={(params) => params.row.in_out === "out"}
        disableRowSelectionOnClick
        disableColumnMenu
      />
      </div>
      </Box>
      <EditCarModal 
        id="confirmation-msg"
        keepMounted
        open={open}
        onClose={handleModalClose}
        value={modalValue}
      />
      </Paper>
  );
};

export default EditCarList;