import React, { useMemo, useState } from "react";
import { Car } from "../models";
import './ParkingList.scss'
import Table from "react-bootstrap/Table";
import { useAppSelector } from "../../app/hook";
import { RootState } from "../../app/store";

// interface Props {
//   parkingList: Car[];
// }

const ParkingList = () => {
  const [search, setSearch] = useState("");
  const carList = useAppSelector((state: RootState) => state.carState.carList);
  const parkingList = useMemo(() => 
    carList.filter((car) => car.status === "停泊中"), [carList]);


  return (
    <div className='car-list-comp'>
      <h5>現時停泊車輛</h5>
      <div className='btns'>
        <button>排序</button>
        <span>
            <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <button>搜尋</button>
        </span>
      </div>

      <Table className="car-list" striped hover >
        <thead>
          <tr>
            <th>次序</th>
            <th>車牌</th>
            <th>車類</th>
            <th>停泊時間</th>
            <th>收據編號</th>
            <th>總時數</th>
            <th>時</th>
            <th>日</th>
            <th>夜</th>
            <th>職員編號</th>
          </tr>
        </thead>
        <tbody>
          {parkingList.map((car: Car, idx) => (
            <tr key={car.id}>
              <td>{idx+1}</td>
              <td>{car.plate}</td>
              <td>{car.type}</td>
              <td>{car.time}</td>
              <td>{car.invoice}</td>
              <td>{car.totalHrs}</td>
              <td>{car.parkedHrs}</td>
              <td>{car.parkedDays}</td>
              <td>{car.parkedNights}</td>
              <td>{car.staff_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ParkingList;
