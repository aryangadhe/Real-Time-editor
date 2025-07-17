import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import RoomId from './pages/RoomId'
import './index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<HomePage/>}></Route>
          <Route path = '/login' element = {<LoginPage/>}></Route>
          <Route path = '/signup' element = {<SignUpPage/>}></Route>
          <Route path='/room' element = {<RoomId/>}> </Route>
          <Route path='/editor/:id' element={<EditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
