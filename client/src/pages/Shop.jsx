import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import { basket } from '../http/userApi'
import { setBrands, setDevices, setTypes, setTotalCount } from '../store/deviceSlice'

function Shop() {
  const dispatch = useDispatch()
  const selectedType = useSelector(state => state.device.selectedType)
  const selectedBrand = useSelector(state => state.device.selectedBrand)
  const page = useSelector(state => state.device.page)
  
  useEffect(() => {
    fetchTypes().then(data => dispatch(setTypes(data)))
    fetchBrands().then(data => dispatch(setBrands(data)))
    fetchDevices(null, null, page, null).then(data =>{
      dispatch(setDevices(data.rows))
      dispatch(setTotalCount(data.count))
    })
  }, [])

  useEffect(() => {
    fetchDevices(selectedType, selectedBrand, page, null).then(data =>{
      dispatch(setDevices(data.rows))
      dispatch(setTotalCount(data.count))
    })
  }, [page, selectedType, selectedBrand])

  return (
    <div className='flex px-10 py-5 justify-center'>
      <div className='mt-2 hidden md:block space-y-5'>
        <TypeBar/>
        <BrandBar/>
      </div>
      <div className='w-[100%] m-2'>
        <DeviceList/>
        <Pages/>
      </div>
    </div>
  )
}

export default Shop