import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { GridRowModel } from '@mui/x-data-grid';
//import { editPrices, fetchDatePrices, formatDate } from './priceSlice';
import { Car, MapCarType, MapIn } from '../models';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import "./DialogEditCar.scss"
import { editIn, editOut } from '../cars/carSlice';
import { RootState } from '../../app/store';

export interface ModalProps {
  id: string;
  keepMounted: boolean;
  value: Car;
  open: boolean;
  onClose: (value?: string | GridRowModel) => void;
}

const mapIn = {
  "invoice_num": "收據編號",
	"plate_num": "車牌",
	"vehicle_type": "車類",
	"entry_time": "泊入時間",
	"staff_id": "職員編號"
}
//const mapOut = {
//  "invoice_num": "收據編號",
//  "plate_num": "車牌",
//  "vehicle_type": "車類",
//  "exit_time": "駛出時間",
//  "staff_id": "職員編號",
//  "total_hours": "總時數",
//  "parked_hours": "時租",
//  "parked_days": "日租",
//  "parked_nights": "夜租",
//  "payment": "總收費"
//}
const mapCarType = {
  "small_car": "小型車",
  "middle_car": "中型車",
  "motorcycle": "電單車"
}
//const mapTime = {
//  "hour": "時租",
//  "day": "日租",
//  "night": "夜租"
//}

export default function EditCarModal(props: ModalProps) {
  const carList: Car[] = useAppSelector((state: RootState) => state.carState.carList);
  const appDispatch = useAppDispatch()

  const { onClose, value: valueProp, open } = props;
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    } else {
      setValue(valueProp)
    }
  }, [valueProp, open]);


  const handleCancel = () => {
    console.log("cancel clicked")
    onClose();
  };

  const handleOk = () => {
    console.log("ok clicked")
    //console.log(valueProp)
    valueProp.edited = true
    valueProp.id = carList.length + 1
    if(valueProp.in_out==="in") {
      appDispatch(editIn(valueProp)).unwrap().then(res=>{
        console.log(`thunk: ${res}`)
      }).catch((err)=>{
        console.log(`thunk: ${err.message}`)
      })
    } else if (valueProp.in_out==="out") {
      appDispatch(editOut(valueProp)).unwrap().then(res=>{
        console.log(`thunk: ${res}`)
      }).catch((err)=>{
        console.log(`thunk: ${err.message}`)
      })
    }
    onClose();
  };

  return (
    <Dialog
      sx={{ 
        '& .MuiDialog-paper': { 
          width: '80%', 
          maxHeight: 550, 
          borderRadius: 4,
          padding: 3
         }
       }}
      maxWidth="xs"
      open={open}
      className='ePrice-dialog'
    >
      <DialogTitle style={{color: "#5A8300", fontWeight: "bold"}}>更改紀錄</DialogTitle>
      <DialogContent className='ePrice-dialog-body'>
        <div>
          {/* {valueProp.in_out === "in" ?  */}
            {Object.keys(valueProp).map((key)=>
            <div key={key} className='modal-msg-row' style={{display: "flex"}}>
              <div style={{width: "130px"}}>
                {Object.keys(mapIn).map((inKey)=>inKey===key?`${mapIn[inKey as keyof MapIn]}:`:null)}
              </div>
              <div>
                {key==="invoice_num" && valueProp[key as keyof Car]}
                {key==="plate_num" && valueProp[key as keyof Car]}
                {key==="vehicle_type" && Object.keys(mapCarType).map((typeKey)=>typeKey===valueProp[key as keyof Car]? mapCarType[typeKey as keyof MapCarType] : null)}
                {key==="staff_id" && valueProp[key as keyof Car]}
              </div>
            </div>)}
            {/* :
            Object.keys(valueProp).map((key)=>
            <div key={key} className='modal-msg-row' style={{display: "flex"}}>
              <div style={{width: "130px"}}>
                {Object.keys(mapOut).map((outKey)=>outKey===key?`${mapOut[outKey as keyof MapOut]}:`:null)}
              </div>
              <div>
                {key==="invoice_num" && valueProp[key as keyof Car]}
                {key==="plate_num" && valueProp[key as keyof Car]}
                {key==="vehicle_type" && Object.keys(mapCarType).map((typeKey)=>typeKey===valueProp[key as keyof Car]? mapCarType[typeKey as keyof MapCarType] : null)}
                {key==="staff_id" && valueProp[key as keyof Car]}
                {key==="total_hours" && valueProp[key as keyof Car]}
                {key==="parked_hours" && valueProp[key as keyof Car]}
                {key==="parked_days" && valueProp[key as keyof Car]}
                {key==="parked_nights" && valueProp[key as keyof Car]}
                {key==="payment" && `$ ${valueProp[key as keyof Car] as number/100}`}
              </div>
            </div>) */}
          
          <p>確認送出?</p>
        </div>
      </DialogContent>
      <DialogActions className='footer'>
        <Button className="cancel" onClick={handleCancel}>取消</Button>
        <Button className="submit" onClick={handleOk}>確認</Button>
      </DialogActions>
    </Dialog>
  );
}

