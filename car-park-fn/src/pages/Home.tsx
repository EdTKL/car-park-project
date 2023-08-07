import React, { useMemo } from 'react'
import './Home.scss'
import { useAppSelector } from '../app/hook';
import { RootState } from '../app/store';
import CarList from '../features/cars/CarList';
import Parking from '../features/parking/Parking';
import Meter from '../features/parking/Space';



const Home = () => {
    const carList = useAppSelector((state: RootState) => state.carState.carList);
    const parkingList = useMemo(() => 
      carList.filter((car) => car.status === "停泊中"), [carList]);
    const shortParkingList = useMemo(() => 
      carList.filter((car) => car.status === "停泊中").slice(0, 4), [carList]);
      console.log(parkingList)

  return (
    <div className='home-container container-fluid d-flex flex-column justify-content-center align-items-center'>
      <div className='first-row'>
        <Meter parkingList={parkingList}/>
        <Parking shortParkingList={shortParkingList}/>
      </div>
      <div className='second-row'>
        <CarList carList={carList}/>
      </div>
    </div>
  )
}

export default Home