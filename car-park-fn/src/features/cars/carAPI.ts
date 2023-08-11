import { useQuery } from "@tanstack/react-query";

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

export function useCarList(){
    const {isLoading, error, data, isFetching} = useQuery({
        queryKey: ["carList"],
        queryFn: async ()=> {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}carpark/carlist`)
            const result = await res.json()
            return result.data as Car[]
        }
    })

    if(isLoading || isFetching || error || !data){
        return []
    }

    return data
    // console.log(data)
}