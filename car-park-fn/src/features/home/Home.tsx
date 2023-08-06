import React from 'react'
import { useAppSelector } from '../../app/hook'
import { RootState } from '../../app/store';
import CarList from './CarList';

const Home = () => {
    const carList = useAppSelector((state: RootState) => state.carState.carList);
    console.log(carList)

  return (
    <CarList carList={carList}/>
  )
}

export default Home