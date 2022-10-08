import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userApi'
import { setIsAuth, setUser } from '../store/userSlice'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const auth = async () => {
    try{
      let user
      if (isLogin) {
        user = await login(email,password)

      }
      else{
        user = await registration(email,password)
      }

      dispatch(setUser(user))
      dispatch(setIsAuth(true))
      navigate(SHOP_ROUTE)
    }
      catch(e){
        alert(e)
    }
  
  }

  return (
  <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h2 className="text-5xl font-bold">{isLogin ? 'Логин' : 'Регистрация'}</h2>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" value={email} onChange={e =>setEmail(e.target.value)}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={e =>setPassword(e.target.value)}/>
          <label className="label">
            {isLogin ? 
              <NavLink to={REGISTRATION_ROUTE}>
                <span href="#" className="label-text-alt link">Нет аккаунта?</span>
              </NavLink>
              :
              <NavLink to={LOGIN_ROUTE}>
                <span href="#" className="label-text-alt link">Есть аккаунт?</span>
              </NavLink>
            }
          </label>
        </div>
        {isLogin ? 
          <div className="form-control mt-6">
            <button onClick={() => auth()} className="btn btn-primary">Войти</button>
          </div>
          :
          <div className="form-control mt-6">
            <button onClick={() => auth()} className="btn btn-primary">Регистрация</button>
          </div>
          } 
      </div>
    </div>
  </div>
</div>
  )
}

export default Auth