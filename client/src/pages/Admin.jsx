import React from 'react'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

function Admin() {
  return (
    <div className='flex justify-center items-center flex-col gap-5 mt-5'>
      <label className='btn btn-ghost w-[50%]' htmlFor="brand">Добавить бренд</label>
      <label className='btn btn-ghost w-[50%]' htmlFor="type">Добавить тип</label>
      <label className='btn btn-ghost w-[50%]' htmlFor="device">Добавить устройство</label>

      <CreateBrand />
      <CreateType />
      <CreateDevice />
    </div>
  )
}

export default Admin