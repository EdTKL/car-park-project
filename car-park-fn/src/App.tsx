import React from 'react';
import CarList from './features/dashboard/CarList';
import Sidebar from './features/sidebar/Sidebar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <CarList />
    </div>
  );
}

export default App;
