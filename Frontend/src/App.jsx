import React from 'react'
import { Route ,Routes, useLocation} from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './component/Nav'
import { useContext } from 'react'
import { UserDataContext } from './context/UserContext'
function App() {
  const {userData}=useContext(UserDataContext);
  const {pathname}=useLocation();
  
  
  return (
    <>
      {!(pathname=='/signup'||pathname=='/login')&&<Nav/>}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Registration/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
