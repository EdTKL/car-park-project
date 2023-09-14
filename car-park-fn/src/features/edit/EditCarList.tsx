import React, {  useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridEventListener, GridPreProcessEditCellProps, GridRowEditStopReasons, GridRowModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./EditCarList.scss";
import { Car } from "../models";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";
import { formatDate } from "../../app/format";
import { Paper } from "@mui/material";
import EditCarModal from "./DialogEditCar";
import { fetchCars } from "../cars/carSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "次序", editable: false, width: 50, flex: 1 },
  {
    field: "plate_num",
    headerName: "車牌",
    width: 75,
    editable: true,
    cellClassName: 'plate-cell',
    flex: 1,
    headerAlign: 'center',
    align:'center'
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
    flex: 1,
    headerAlign: 'center',
    align:'center'
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
    flex: 1,
    headerAlign: 'center',
    align:'center'
  },
  {
    field: "time",
    headerName: "時間",
    type: "time",
    minWidth: 130,
    editable: false,
    valueFormatter(params) {
      if (!params.value) {
        return '-';
      } else {
      return formatDate(params.value)
      }
    },
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
        return '-';
      } else {
       return params.value;
      }
    },
    flex: 1,
    headerAlign: 'center',
    align:'center'
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
        return '-';
      } else {
        return params.value;
      }
    },
    flex: 1,
    headerAlign: 'center',
    align:'center'
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
        return '-';
      } else {
        return params.value;
      }
    },
    flex: 1,
    headerAlign: 'center',
    align:'center'
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
        return '-';
      } else {
        return params.value;
      }
    },
    flex: 1,
    headerAlign: 'center',
    align:'center'
  },
  {
    field: "payment",
    headerName: "總收費",
    type: "number",
    width: 100,
    editable: false,
    valueFormatter(params) {
      if (params.value === null) {
        return '-';
      } else {
       return `${params.value/100}`
      }
    },
    flex: 1,
    headerAlign: 'center',
    align:'center'
  },
  {
    field: "staff_id",
    headerName: "職員編號",
    type: "string",
    minWidth: 90,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align:'center'
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
    // flex: 1,
    headerAlign: 'center',
    align:'center'
  },
];

const EditCarList: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [input, setInput] = useState<string>("");
  const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);
  const [rows, setRows] = useState<Car[]>(carList)

  //set default sorting model
  const [sortModel, setSortModel] = React.useState([{field: 'id', sort: 'desc'}] as any);

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
        dispatch(fetchCars())
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
            dispatch(fetchCars())
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
      elevation={2} 
      sx={{
        padding: '10px',
        maxHeight: '100%',
        borderRadius: '20px',
        width: '100%',
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
      <Box className="btns" mb={0.5} paddingX="6px">
        <div></div>
        {/* <button>排序</button> */}
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
          paddingX: "6px",
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
        columnHeaderHeight={52}
        rowHeight={48}
        pageSizeOptions={[10, 15]}
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