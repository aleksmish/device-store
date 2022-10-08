import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { check } from "./http/userApi";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { setIsAuth, setUser } from "./store/userSlice";
import {CircularProgress} from '@mui/material'

function App() {
  const user = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    check().then(data => {
      dispatch(setUser(data))
      dispatch(setIsAuth(true))
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"> 
        <CircularProgress />
      </div>
    )
  }
  
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
