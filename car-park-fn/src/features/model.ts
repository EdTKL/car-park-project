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