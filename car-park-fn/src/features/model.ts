import { SvgIconProps } from "@mui/material"
import  { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface Car {
    id: number,
    invoice: string,
    plate: string,
    type: string,
    entryExit: string,
    time: string,
    totalHrs: number,
    parkingHrs: number,
    parkingDays: number,
    parkingNights: number,
    payment: number,
    status: string,
    staff_id: string,
    edited: boolean,

}

export interface CarPark {
    id: number,
    name: string,
    totalSpace: number,
    smCarSpace: number,
    mdCarSpace: number,
    motoSpace: number,
}

export type SidebarButton = {
    key: string,
    linkTo: string,
    icon: React.ReactElement<SvgIconProps>, 
    primary: string
}

export type Price = {
    key: string,
    time: string, 
    smallVehiclePrice: number, 
    middleVehiclePrice: number, 
    motorbikePrice: number
}