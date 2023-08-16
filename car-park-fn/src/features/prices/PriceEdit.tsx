import * as React from 'react';
import { GridColDef, DataGrid, GridValueGetterParams, GridValueSetterParams } from "@mui/x-data-grid";
import "./EditPrice.scss";
import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hook';
import { RootState } from '../../app/store';
//import type { PriceList } from '../models';

const PriceEdit = () => {
  const [finalClickInfo, setFinalClickInfo] = React.useState({} as any);
    const handleOnCellEditStop = (params: any) => {
      console.log(params.field)
      console.log(params)
      //console.log(finalClickInfo.field)
      //setFinalClickInfo(params);
    };

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
      { field: 'day_start', headerName: '由', minWidth: 40, sortable: false, flex: 1, description:"時租每一小時收費, 最少停泊一小時" },
      { field: 'night_start', headerName: '至', minWidth: 40, sortable: false, flex: 1, description:"時租每一小時收費, 最少停泊一小時" },
      { field: 'mon', headerName: '星期一', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'tue', headerName: '星期二', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'wes', headerName: '星期三', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'thu', headerName: '星期四', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'fri', headerName: '星期五', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'sat', headerName: '星期六', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'sun', headerName: '星期日', minWidth: 70, sortable: false, flex: 1, editable: true },
      { field: 'ph', headerName: '公眾假期', minWidth: 70, sortable: false, flex: 1, editable: true },
    ];
    //get current prices from global state
    const pricetable = useAppSelector((state: RootState) => state.ePriceState.prices)
    //console.log(pricetable)
    
    const minDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    };
    const [selectedStart, setSelectedDate] = React.useState(minDate());

    return (
      <Paper elevation={3} className="ePrice-comp" 
      sx={{borderRadius: "20px", p: 2}} 
      style={{height: "100%"}}>
        <Typography variant='h5' className="ePriceHeader">價目表</Typography>
        <div className="parkName">
            {/* <Typography variant='h5' className="epHeading">庇利街</Typography> */}
            <div className='dateInput' style={{display: "flex", paddingBottom: 5, marginBottom: "1em", marginTop: "1em"}}>
              <Typography style={{ paddingRight: "10px" }} >由此日期生效:</Typography>
              <input type='date'
                style={{ marginRight: "10px" }}
                value={selectedStart}
                min={minDate()}
                onChange={(e) => setSelectedDate(e.target.value)} />
              <input type='submit' />
            </div>
        </div>
        <div className="ePrice" style={{ width: '100%', height: "90%" }}>
        <DataGrid 
            className='ePriceDataGrid'
            editMode='row'
            onRowEditStop={handleOnCellEditStop}
            
            rows={pricetable}
            columns={columns}
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
            {/* {finalClickInfo &&
            `Final clicked id = ${finalClickInfo.id}, 
            Final clicked field = ${finalClickInfo.field}, 
            Final clicked value = ${finalClickInfo.value}`} */}
          </div>
    </Paper>
    )
}

export default PriceEdit