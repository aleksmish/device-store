import React from 'react'
import {redirect, useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
function DeviceItem({device}) {
    const navigate = useNavigate()
    return (
        <div className='w-[300px] inline-block p-5 cursor-pointer' onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
            <div className="card card-compact bg-base-100 shadow-xl text-sm">
                <figure>
                    <img className='object-scale-down w-[300px] h-[200px]' src={process.env.REACT_APP_API_URL + device.img} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{device.name.length <= 20 ? device.name : device.name.substr(0, 17)+"..."}</h2>
                    <span className='text-lg'>{device.price} р.</span>
                </div>
            </div>
        </div>
    )
}

export default DeviceItem