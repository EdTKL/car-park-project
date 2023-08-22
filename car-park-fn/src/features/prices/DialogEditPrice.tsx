import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { GridRowModel } from '@mui/x-data-grid';
import { editPrices, fetchDatePrices, formatDate } from './priceSlice';
import { MapCarType, MapTime, Mapping, PriceList } from '../models';
import { minDate } from './PriceEdit';
import { useAppDispatch } from '../../app/hook';
import "./DialogEditPrice.scss"


export interface ModalProps {
  id: string;
  keepMounted: boolean;
  value: PriceList;
  open: boolean;
  onClose: (value?: string | GridRowModel) => void;
}


const mapKeys = {
    "vehicle_type": "車型", 
    "fee_type": "時段", 
    "day_start": "開始時間", 
    "night_start": "完結時間", 
    "mon": "星期一",
    "tue": "星期二",
    "wed": "星期三",
    "thu": "星期四",
    "fri": "星期五",
    "sat": "星期六",
    "sun": "星期日",
    "ph": "公眾假期"
}
const mapCarType = {
  "small_car": "小型車",
  "middle_car": "中型車",
  "motorcycle": "電單車"
}
const mapTime = {
  "hour": "時租",
  "day": "日租",
  "night": "夜租"
}

export default function ModalMsg(props: ModalProps) {
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
      appDispatch(editPrices([valueProp])).unwrap().then(res=>{
        console.log(`thunk: ${res}`)
      }).catch((err)=>{
        console.log(`thunk: ${err.message}`)
      })
      appDispatch(fetchDatePrices(minDate())).unwrap().then(res=>{
        console.log(`fetch after edit price: ${res}`)
      }).catch((err)=>{
        console.log(`fetch after edit price: ${err.message}`)
      })
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
      <DialogTitle style={{color: "#5A8300", fontWeight: "bold"}}>以下價錢將於 {formatDate()} 生效:</DialogTitle>
      <DialogContent className='ePrice-dialog-body'>
        <div>
            {Object.keys(value).map((key)=>key!=="id"?
            <div key={key} className='modal-msg-row' style={{display: "flex"}}>
              <div style={{width: "130px"}}>
                {Object.keys(mapKeys).map((mKey)=>mKey===key?`${mapKeys[mKey as keyof Mapping]}:`:null)} 
                </div>
              <div>
                {key === "vehicle_type" && Object.keys(mapCarType).map((mKey)=>mKey===value[key as keyof PriceList]? mapCarType[mKey as keyof MapCarType]:null)}
                {key === "fee_type" && Object.keys(mapTime).map((mKey)=>mKey===value[key as keyof PriceList]? mapTime[mKey as keyof MapTime]:null)}
                {key === "day_start" && value[key as keyof PriceList]}
                {key === "night_start" && value[key as keyof PriceList]}
                {typeof value[key as keyof PriceList] === "number" ? `$ ${value[key as keyof PriceList]}` : null}
              </div>
            </div> 
            :null)}
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

