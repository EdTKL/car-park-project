import React, { useMemo } from 'react'
import { useAppSelector } from '../../app/hook'
import { RootState } from '../../app/store';
import CarList from './CarList';
import './home.scss'
import ParkedTimeline from './ParkedTimeline';
import Meter from './Meter';


const Home = () => {
    const carList = useAppSelector((state: RootState) => state.carState.carList);
    const parkedList = useMemo(() => 
      carList.filter((car) => car.status === "停泊中"), [carList]);
    const parkedListOf5 = useMemo(() => 
      carList.filter((car) => car.status === "停泊中").slice(0, 4), [carList]);
      console.log(parkedList)

  return (
    <div className='home-container container-fluid d-flex flex-column justify-content-center align-items-center'>
      <div className='first-row'>
        <Meter parkedList={parkedList}/>
        <ParkedTimeline parkedListOf5={parkedListOf5}/>
      </div>
      <div className='second-row'>
        <CarList carList={carList}/>
      </div>
    </div>
  )
}

export default Home