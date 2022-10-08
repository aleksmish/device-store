import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedType } from '../store/deviceSlice'

function TypeBar() {
    const types = useSelector((state) => state.device.types)
    const selectedType = useSelector((state) => state.device.selectedType)
    const dispatch = useDispatch()
    return (
        <ul className="menu bg-base-100 w-56 border border-white rounded-lg h-[350px]">
            {types.map(type => 
                <li key={type.id} onClick={() => dispatch(setSelectedType(type.id))} className="border-b"><span className={type.id === selectedType ? 'active' : ''}>{type.name}</span></li>
            )}
        </ul>
    )
}

export default TypeBar