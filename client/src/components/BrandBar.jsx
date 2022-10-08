import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedBrand } from '../store/deviceSlice'

function BrandBar() {
    const brands = useSelector((state) => state.device.brands)
    const selectedBrand = useSelector((state) => state.device.selectedBrand)
    const dispatch = useDispatch()
    return (
      <ul className="menu bg-base-100 hidden md:block border-red-100 border rounded-lg w-56 h-[350px]">
          {brands.map(brand => 
              <li className='block border-b' key={brand.id} onClick={() => dispatch(setSelectedBrand(brand.id))}><span className={brand.id === selectedBrand ? 'active' : ''}>{brand.name}</span></li> 
          )}
      </ul>
    )
}

export default BrandBar