import { SvgIconProps } from "@mui/material"

export interface Car {
    id: number,
    invoice: string,
    plate: string,
    type: string,
    in_out: string,
    time: string,
    totalHrs: number,
    parkedHrs: number,
    parkedDays: number,
    parkedNights: number,
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
    timeslot: string, 
    small: number, 
    middle: number, 
    motor: number
}

export type PriceEdit = {
    small: number, 
    middle: number, 
    motor: number
}

//export type PriceList = {
//    dayId: string,
//    smHour: number, 
//    mdHour: number,
//    motoHour: number,
//    smDay: number,
//    mdDay: number,
//    motoDay: number,
//    smNight: number,
//    mdNight: number,
//    motoNight : number
//}

export type PriceList = {
    type: string, 
    timeslot: string, 
    duration: string, 
    mon: number,
    tue: number,
    wes: number,
    thu: number,
    fri: number,
    sat: number,
    sun: number,
    ph: number
}