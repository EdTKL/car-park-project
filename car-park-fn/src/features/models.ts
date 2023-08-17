import { SvgIconProps } from "@mui/material"

export interface Car {
    id: number,
    invoice_num: string,
    plate_num: string,
    vehicle_type: string,
    in_out: string,
    time: string,
    total_hours?: number,
    parked_hours?: number,
    parked_days?: number,
    parked_nights?: number,
    payment?: number,
    status: string,
    staff_id: string,
    edited: boolean,
}

export interface CarPark {
    id: number,
    name: string,
    smCarSpace: number,
    mdCarSpace: number,
    motoSpace: number,
    totalSpace: number,
}

export type SidebarButton = {
    key: string,
    linkTo: string,
    icon: React.ReactElement<SvgIconProps>, 
    primary: string
}

export type Price = {
    key: string,
    timeslot: "day" | "night" | "hour", 
    small_car: number | string, 
    middle_car: number | string, 
    motorcycle: number | string
}

export type PriceEdit = {
    small: number, 
    middle: number, 
    motor: number
}

export type PriceList = {
    id: number,
    vehicle_type: string, 
    fee_type: string, 
    day_start: string, 
    night_start: string, 
    mon: number,
    tue: number,
    wed: number,
    thu: number,
    fri: number,
    sat: number,
    sun: number,
    ph: number
}

