import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBasketDevices, setIsAuth, setUser } from '../store/userSlice'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import {BiMenuAltRight} from 'react-icons/bi'
import { basket } from '../http/userApi'

function NavBar() {
    const isAuth = useSelector(state => state.user.isAuth)
    const basketDevices = useSelector(state => state.user.basketDevices)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(basketDevices)

    useEffect(() => {
        basket(user.id).then(data => dispatch(setBasketDevices(data))).catch(err => console.log(err))
    }, [user])

    useEffect(() => {
        basket(user.id).then(data => dispatch(setBasketDevices(data))).catch(err => console.log(err))
      }, [])

    const logOut = () => {
        dispatch(setUser({}))
        dispatch(setIsAuth(false))
    }

    return (
        <div className="navbar bg-neutral text-neutral-content px-3 md:px-10">
            <button className="btn btn-ghost normal-case text-xl text-white" onClick={() => navigate(SHOP_ROUTE)}>DeviceStore</button>
            {isAuth ? 
                <div className='ml-auto'>
                    <label className="btn btn-circle swap swap-rotate md:hidden ">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn m-1"><BiMenuAltRight size={25}/></label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={() => navigate(ADMIN_ROUTE)}><span>Админ панель</span></li>
                                <li onClick={() => logOut()}><span>Выйти</span></li>
                            </ul>
                        </div>
                    </label>
                    <div className='hidden md:inline-flex'>
                        <button className="btn text-[#f6f6f6]" onClick={() => navigate(ADMIN_ROUTE)}>Админ Панель</button>
                        <button className="btn text-[#f6f6f6] ml-5" onClick={() => logOut()}>Выйти</button>
                        <div className="dropdown dropdown-end ml-5">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{basketDevices.length}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                <span className="font-bold text-lg">В корзине: {basketDevices.length}</span>
                                <span className="text-info">Сумма: {(basketDevices.reduce((acc, item) => {return acc + parseInt(item.price)}, 0))} р.</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block" onClick={() => navigate(BASKET_ROUTE)}>Посмотреть корзину</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    :
                <div className='ml-auto'> 
                    <button className="btn text-[#f6f6f6]" onClick={() => navigate(LOGIN_ROUTE)}>Войти</button>
                </div>
            } 
        </div>
    )
}

export default NavBar