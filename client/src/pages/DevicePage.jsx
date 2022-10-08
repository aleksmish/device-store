import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToBasket, rate } from "../http/userApi"
import { fetchOneDevice } from '../http/deviceApi'
import { SHOP_ROUTE } from '../utils/consts'
import { useDispatch } from 'react-redux'
import { addBasketDevice, setBasketDevices } from '../store/userSlice'

function DevicePage() {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchOneDevice(id).then(data => 
      {
        if(!data){navigate(SHOP_ROUTE)}
        setDevice(data)
      }).catch(err => alert(err))
  }, [])

  const addRating = (rating, deviceId) => {
    rate(rating, deviceId).catch(err => alert(err.response.data.message))
  }

  const averageRating = device.rating
  return (
    <div className="bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img alt={device.name} src={process.env.REACT_APP_API_URL + device.img} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{device.name}</h1>
          <div className='flex flex-row items-center text-center mr-2'>
            <div className="rating mt-2" onClick={e => addRating(parseFloat(e.target.getAttribute('name')), device.id)}>
              <input type="radio" name="1" className="mask mask-star" readOnly checked={averageRating <= 1 ? true : false}/>
              <input type="radio" name="2" className="mask mask-star" readOnly checked={averageRating >=2 && averageRating <=3 ? true : false}/>
              <input type="radio" name="3" className="mask mask-star" readOnly checked={averageRating >=3 && averageRating <=4 ? true : false}/>
              <input type="radio" name="4" className="mask mask-star" readOnly checked={averageRating >=4 && averageRating <=4.79 ? true : false}/>
              <input type="radio" name="5" className="mask mask-star" readOnly checked={averageRating >=4.8 && averageRating <=5 ? true : false}/>
            </div>
            <p >{averageRating?.toFixed(1)}</p>
          </div>
          <p className="py-6">{device.price} р.</p>
          <button className='btn btn-info mr-2' onClick={() => addToBasket(id).then(basketDevice => dispatch(addBasketDevice({...basketDevice}))).catch(err => alert(err.response.data.message))}>Добавить в корзину</button>
          <button className="btn btn-primary">Купить</button>
        </div>
      </div>
      <hr className='opacity-70 mt-2'/>
      <div className=''>
      {device.info.map(i => 
        <div key={i.id} className="flex flex-row text-center items-center w-full p-5 mt-10 border border-gray-200">
          <div className="w-[50%]">{i.title}</div>
          <div className="divider divider-horizontal"></div>
          <div className="w-[50%]">{i.description}</div>
        </div>
        )}
      </div>
    </div>
  )
}

export default DevicePage