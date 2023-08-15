import * as React from 'react';
import { GridColDef, DataGrid, GridValueGetterParams, GridValueSetterParams } from "@mui/x-data-grid";
import "./EditPrice.scss";
import { Paper, Typography } from '@mui/material';
//import type { PriceList } from '../models';

const PriceEdit = () => {
  //const [finalClickInfo, setFinalClickInfo] = React.useState({} as any);
    const handleOnCellEditStop = (params: any) => {
      console.log(params.field)
      console.log(params)
      //console.log(finalClickInfo.field)
      //setFinalClickInfo(params);
    };

    const columns: GridColDef[] = [
      { field: 'type', headerName: '車型', minWidth: 90, sortable: false, flex: 1 },
      { field: 'timeslot', headerName: ' ', minWidth: 90, sortable: false, flex: 1 },
      { field: 'duration', headerName: '生效時段', minWidth: 120, sortable: false, flex: 1, editable: true, description:"時租每一小時收費, 最少停泊一小時" },
      { field: 'mon', headerName: '星期一', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'tue', headerName: '星期二', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'wes', headerName: '星期三', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'thu', headerName: '星期四', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'fri', headerName: '星期五', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'sat', headerName: '星期六', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'sun', headerName: '星期日', minWidth: 90, sortable: false, flex: 1, editable: true },
      { field: 'ph', headerName: '公眾假期', minWidth: 90, sortable: false, flex: 1, editable: true },
    ];
    const pricetable = [
        {id: 1, type: "電單車", timeslot: "時租", duration: "00:00 - 24:00",  mon: 19, tue: 19, wes: 19, thu: 19, fri: 19, sat: 19, sun: 19, ph: 19},
        {id: 2, type: "電單車", timeslot: "日泊", duration: "08:00 - 18:00",  mon: 105, tue: 105, wes: 105, thu: 105, fri: 105, sat: 105, sun: 105, ph: 105},
        {id: 3, type: "電單車", timeslot: "夜泊", duration: "18:00 - 08:00",  mon: 80, tue: 80, wes: 80, thu: 80, fri: 80, sat: 80, sun: 80, ph: 80},
        {id: 4, type: "小型車", timeslot: "時租", duration: "00:00 - 24:00",  mon: 19, tue: 19, wes: 19, thu: 19, fri: 19, sat: 19, sun: 19, ph: 19},
        {id: 5, type: "小型車", timeslot: "日泊", duration: "08:00 - 18:00",  mon: 105, tue: 105, wes: 105, thu: 105, fri: 105, sat: 105, sun: 105, ph: 105},
        {id: 6, type: "小型車", timeslot: "夜泊", duration: "18:00 - 08:00",  mon: 80, tue: 80, wes: 80, thu: 80, fri: 80, sat: 80, sun: 80, ph: 80},
        {id: 7, type: "中型車", timeslot: "時租", duration: "00:00 - 24:00",  mon: 40, tue: 40, wes: 40, thu: 40, fri: 40, sat: 40, sun: 40, ph: 40},
        {id: 8, type: "中型車", timeslot: "日泊", duration: "08:00 - 18:00",  mon: 200, tue: 200, wes: 200, thu: 200, fri: 200, sat: 200, sun: 200, ph: 200},
        {id: 9, type: "中型車", timeslot: "夜泊", duration: "18:00 - 08:00",  mon: 200, tue: 200, wes: 200, thu: 200, fri: 200, sat: 200, sun: 200, ph: 200}
    ]
    const minDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    };
    const [selectedStart, setSelectedDate] = React.useState(minDate());

    return (
      <Paper elevation={3} className="ePrice-comp" 
      sx={{borderRadius: "20px", p: 2}} 
      style={{height: "100%"}}>
        <form id='editPriceForm'>
        <Typography variant='h5' className="ePriceHeader">價目表</Typography>
        <div className="parkName">
            <Typography variant='h5' className="epHeading">庇利街</Typography>
            <div className='dateInput' style={{display: "flex", paddingBottom: 5}}>
              <Typography style={{ paddingRight: "10px" }}>由此日期生效:</Typography>
              <input type='date'
                style={{ marginRight: "10px" }}
                value={selectedStart}
                min={minDate()}
                onChange={(e) => setSelectedDate(e.target.value)} />
              <input type='submit' />
            </div>
        </div>
        <div className="ePrice" style={{ width: '100%', maxHeight: "100%" }}>
        <DataGrid 
            className='ePriceDataGrid'
            //editMode='row'
            onCellEditStop={handleOnCellEditStop}
            rows={pricetable}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 3 },
              },
            }}
            pageSizeOptions={[3, 6, 9]}
            sx={{"& .MuiDataGrid-row:hover": {
              backgroundColor: "#FFE08A",
              borderRadius: 2,
            }}}
            
            />
            {/* {finalClickInfo &&
            `Final clicked id = ${finalClickInfo.id}, 
            Final clicked field = ${finalClickInfo.field}, 
            Final clicked value = ${finalClickInfo.value}`} */}
          </div>
        </form>
    </Paper>
    )
}

export default PriceEdit