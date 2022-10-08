import React from 'react'
import { useSelector } from 'react-redux'
import DeviceItem from './DeviceItem'

export default function DeviceList() {
    const devices = useSelector((state) => state.device.devices)
    return (
        <div className='block'>
            {devices.map((device) => 
                <DeviceItem key={device.id} device={device} />
            )}
        </div>
    )
}
