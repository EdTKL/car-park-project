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