import { useQuery } from "@tanstack/react-query";
import { Car } from "../models";

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