import React from 'react';
import Sidebar from './features/sidebar/Sidebar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Home from './features/home/Home';

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
