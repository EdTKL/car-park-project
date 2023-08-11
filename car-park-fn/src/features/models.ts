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
    time: string, 
    smallVehiclePrice: number, 
    middleVehiclePrice: number, 
    motorbikePrice: number
}