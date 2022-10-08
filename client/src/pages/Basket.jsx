import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

function Basket() {
  const basketDevices = useSelector(state => state.user.basketDevices)

  return (
    <div className='flex justify-center items-center flex-col mt-2'>
      {basketDevices.length === 0 ?
      <div>Корзина пуста 🛒</div>
      :
      basketDevices.map(bd => 
      <Link key={bd.id} to={DEVICE_ROUTE + "/" + bd.id}>
        <div key={bd.id} className='w-[300px] inline-block p-5 cursor-pointer'>
          <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src={process.env.REACT_APP_API_URL + bd.img} className='object-scale-down w-[300px] h-[200px]' alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">
                {bd.name}
              </h2>
            </div>
          </div>
        </div>  
      </Link>
      )}
    </div>
  )
}

export default Basket