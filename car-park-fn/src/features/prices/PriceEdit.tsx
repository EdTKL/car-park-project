import * as React from 'react';
import { GridColDef, DataGrid, GridPreProcessEditCellProps, GridRowModel, GridEventListener, GridRowEditStopReasons } from "@mui/x-data-grid";
import "./EditPrice.scss";
import { Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { RootState } from '../../app/store';
import { fetchDatePrices, fetchPrices } from './priceSlice';
import { PriceList } from '../models';
import SearchIcon from '@mui/icons-material/Search';
import ModalMsg from './DialogEditPrice';

//on change hook of date input
export const minDate = () => {
    const today = new Date().toISOString().split('T')[0];
    return today;
};

const PriceEdit = () => {
    const appDispatch = useAppDispatch()
  
    //empty array as initial state
    const prices = useAppSelector((state: RootState) => state.ePriceState.prices)
    //fetch price list as rendered
      React.useEffect(()=>{
        appDispatch(fetchPrices("")).unwrap().then(res=>{
          console.log(`priceEdit fetch: ${res}`)
        }).catch((err)=>{
          console.log(`priceEdit fetch: ${err.message}`)
        })
      },[appDispatch])  
    const [sortModel, setSortModel] = React.useState([{field: 'vehicle_type', sort: 'desc'}] as any);
    
    //get today from Global State
    let priceDate = useAppSelector((state: RootState) => state.ePriceState.date)
    
    //enable edit with condition
    const setEditable = ()=> {
      if (priceDate === selectedStart) {
        return true
      } else {
        return false
      }
    }
    const [selectedStart, setSelectedDate] = React.useState(minDate());

    //column header setting
    const columns: GridColDef[] = [
      { field: 'vehicle_type', 
        headerName: '車型', 
        minWidth: 100, 
        sortable: true, 
        flex: 1,
        valueFormatter(params) {
          if (params.value === 'small_car') {
            return '小型車';
          } else if (params.value === 'motorcycle'){
           return '電單車';
          } else if (params.value === 'middle_car') {
            return '中型車'
          }
        }, },
      { field: 'fee_type', 
        headerName: ' ', 
        minWidth: 50, 
        sortable: true, 
        flex: 1,
        valueFormatter(params) {
          if (params.value === 'hour') {
            return '時租';
          } else if (params.value === 'day'){
           return '日租';
          } else if (params.value === 'night') {
            return '夜租'
          }
        }, },
      { field: 'day_start', 
        headerName: '由', 
        minWidth: 40, 
        sortable: false, 
        flex: 1, 
        valueGetter: (params)=>{
          if (params.row.fee_type === "hour"){
            return "00:00"
          } else if (params.row.fee_type === "day"){
            return params.value
          }else if (params.row.fee_type === "night") {
            return params.row.night_start
          }
        },
        description:"時租每一小時收費, 最少停泊一小時" },
      { field: 'night_start', 
        headerName: '至', 
        minWidth: 40, 
        sortable: false, 
        flex: 1, 
        valueGetter: (params)=>{
          if (params.row.fee_type === "hour"){
            return "24:00"
          } else if (params.row.fee_type === "day") {
            return params.value
          } else if (params.row.fee_type === "night") {
            return params.row.day_start
          }
        },
        description:"時租每一小時收費, 最少停泊一小時" },
      { field: 'mon', 
        headerName: '星期一', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
      },
      { field: 'tue', 
        headerName: '星期二', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
      { field: 'wed', 
        headerName: '星期三', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
      { field: 'thu', 
        headerName: '星期四', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
      { field: 'fri', 
        headerName: '星期五', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
      { field: 'sat', 
        headerName: '星期六', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
      { field: 'sun', 
        headerName: '星期日', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
      { field: 'ph', 
        headerName: '公眾假期', 
        minWidth: 70, 
        sortable: false, 
        flex: 1, 
        editable: setEditable() as boolean,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = isNaN(params.props.value);
          return { ...params.props, error: hasError };
        },
       },
    ]; 
    
    //handle date submit to fetch prices of the day
    const submitDateHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      appDispatch(fetchDatePrices(selectedStart)).unwrap().then(res=>{
        console.log(`Check price of the day: ${res}`)
      }).catch((err)=>{
        console.log(`Check price of the day: ${err.message}`)
      })
    }

    //handle inline edit submission
    const formatted: PriceList[] = [{
    id:0, vehicle_type: '', fee_type: '', day_start: '', night_start: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0, ph: 0}]
    const processRowUpdate = (newRow: GridRowModel) => {
      
      const updatedRow = { ...newRow, isNew: false };
        formatted[0].id = newRow.id
        formatted[0].vehicle_type = newRow.vehicle_type
        formatted[0].fee_type = newRow.fee_type
        formatted[0].day_start = newRow.day_start
        formatted[0].night_start = newRow.night_start
        formatted[0].mon = parseInt(newRow.mon)
        formatted[0].tue = parseInt(newRow.tue)
        formatted[0].wed = parseInt(newRow.wed)
        formatted[0].thu = parseInt(newRow.thu)
        formatted[0].fri = parseInt(newRow.fri)
        formatted[0].sat = parseInt(newRow.sat)
        formatted[0].sun = parseInt(newRow.sun)
        formatted[0].ph = parseInt(newRow.ph)

        setModalValue(formatted[0])

      return updatedRow;
    };

    //discard unsubmitted changes
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };

    //modal
    const [open, setModalOpen] = React.useState(false);
    //open
    const handleModalOpen = (newRow: GridRowModel) => {
      setModalOpen(true);
      processRowUpdate(newRow)
      return newRow
    };
    //close
    const handleModalClose = () => {
      appDispatch(fetchDatePrices(minDate())).unwrap().then(res=>{
        console.log(`fetch after closing modal: ${res}`)
      }).catch((err)=>{
        console.log(`fetch after closing modal: ${err.message}`)
      })
      setModalOpen(false);
    }
    const [modalValue, setModalValue] = React.useState(formatted[0])

    return (
      <Paper elevation={3} className="ePrice-comp" 
      sx={{borderRadius: "20px", p: 2}} 
      style={{height: "100%"}}>
        <Typography variant='h5' className="ePriceHeader">價目表</Typography>
        <div className="parkName">
            <div className='dateInput' style={{display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "0.3em", marginTop: "0.3em"}}>
              <form onSubmit={submitDateHandler}><input type='date'
                  style={{ marginRight: "10px", borderRadius: "10px", borderWidth: "1px", padding: "2px", border: "none" }}
                  value={selectedStart}
                  //min={minDate()}
                  onChange={(e) => setSelectedDate(e.target.value)} />
                  <Button className="submit" type='submit' sx={{pt: "2px", pb: "2px", pl: "0px", pr: "3px"}}><SearchIcon fontSize='small' />查閱</Button>
              </form>
            </div>
        </div>
        <div className="ePrice" style={{ width: '100%', height: "90%" }}>
        <DataGrid 
            className='ePriceDataGrid'
            editMode='row'
            onRowEditStop={handleRowEditStop}
            processRowUpdate={handleModalOpen}
            rows={prices}
            columns={columns}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 9 },
              },
            }}
            pageSizeOptions={[3, 6, 9]}
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
          />
          {/* dialog box */}
          <ModalMsg
            id="confirmation-msg"
            keepMounted
            open={open}
            onClose={handleModalClose}
            value={modalValue}
          />
          </div>
    </Paper>
    )
}

export default PriceEdit