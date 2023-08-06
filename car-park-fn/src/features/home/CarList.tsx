import React, { useState } from "react";
import { Car } from "./model";
import "./styles.scss";
import Table from "react-bootstrap/Table";

interface Props {
  carList: Car[];
}

const CarList = ({carList}:Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className='car-list-comp'>
      <h5>所有進出車輛</h5>
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
            <th>進／出</th>
            <th>時間</th>
            <th>收據編號</th>
            <th>收費</th>
            <th>狀態</th>
            <th>職員編號</th>
          </tr>
        </thead>
        <tbody>
          {carList.map((car: Car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.plate}</td>
              <td>{car.type}</td>
              <td>{car.entryExit}</td>
              <td>{car.time}</td>
              <td>{car.invoice}</td>
              <td>{car.payment}</td>
              <td>{car.status}</td>
              <td>{car.staff_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CarList;
