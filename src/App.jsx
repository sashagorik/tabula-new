import './App.css'
import Home from './Pages/Home'
import { Routes, Route } from "react-router-dom"
import Layout from './Layout/Layout'
import Earn from './Pages/Earn/Earn';
import Invite from './Pages/Invite/Invite';
import Booster from './Pages/Booster/Booster';
import Task from './Pages/Task/Task';

import { baseUrl } from './services/helper';
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react';





function App() {

  const [isSocket, setSocket] = useState(null)
  
  useEffect(()=>{
    const socket = io.connect(`${baseUrl}`,{ transports: ["websocket"] });
    setSocket(socket)
  },[window.location.href])


  return (
    <>
      <Routes>
        <Route path='' element={<Layout />} >
          <Route path="/" element={<Home socket={isSocket} />} />
          <Route path="/task" element={<Task />} />
          <Route path="/boost" element={<Booster />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/earn" element={<Earn />} />
        </Route>
      </Routes>


    </>
  )
}

export default App
