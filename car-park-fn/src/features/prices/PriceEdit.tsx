import * as React from 'react';
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import "./EditPrice.scss";
import { Paper, Typography } from '@mui/material';


//const tableHead = []

const PriceEdit = () => {
    const columns: GridColDef[] = [
      { field: 'type', headerName: '車型', width: 90, sortable: false },
      { field: 'timeslot', headerName: ' ', width: 90, sortable: false },
      { field: 'duration', headerName: '生效時段', width: 120, sortable: false, editable: true, description:"時租每一小時收費, 最少停泊一小時" },
      { field: 'mon', headerName: '星期一', width: 90, sortable: false, editable: true },
      { field: 'tue', headerName: '星期二', width: 90, sortable: false, editable: true },
      { field: 'wes', headerName: '星期三', width: 90, sortable: false, editable: true },
      { field: 'thu', headerName: '星期四', width: 90, sortable: false, editable: true },
      { field: 'fri', headerName: '星期五', width: 90, sortable: false, editable: true },
      { field: 'sat', headerName: '星期六', width: 90, sortable: false, editable: true },
      { field: 'sun', headerName: '星期日', width: 90, sortable: false, editable: true },
      { field: 'ph', headerName: '公眾假期', width: 90, sortable: false, editable: true },
    ];
    //const pricetable = useAppSelector((state: RootState) => state.ePriceState.pricetable);
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
    console.log(pricetable)

    return (
    <Paper sx={{ p: 1 }}>
        <Typography variant='h5' className="ePriceHeader">價目表</Typography>
        <div className="parkName">
            <Typography variant='h5' className="epHeading">庇利街</Typography>
            <Typography>有效日期: 2023/03/01 至 2099/12/31</Typography>
        </div>
        <div className="ePrice" style={{ width: '100%' }}>
        <DataGrid 
            
            rows={pricetable}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 3 },
              },
            }}
            pageSizeOptions={[3, 6, 9]}
            // checkboxSelection
          />
        </div>
    </Paper>
    )
}

export default PriceEdit