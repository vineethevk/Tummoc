import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Register } from './components/Register/Register';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/' element={<Register />}></Route>
      </Routes>
    </>
  )
}

export default App
