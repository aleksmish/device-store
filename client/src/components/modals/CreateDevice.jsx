import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi'
import { setTypes, setBrands, setDevices } from '../../store/deviceSlice'

function CreateDevice() {
    const types = useSelector((state) => state.device.types)
    const brands = useSelector((state) => state.device.brands)
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [file,setFile] = useState()
    const [brandId,setBrandId] = useState(0)
    const [typeId,setTypeId] = useState(0)
    const [info,setInfo] = useState([])
    
    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
        fetchDevices().then(data => dispatch(setDevices(data.rows)))
      }, [])
    
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}])
    }
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id))
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        console.log(file)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('brandId', brandId)
        formData.append('typeId', typeId)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => window.location.reload())
    }

    return (
        <div>
            <input type="checkbox" id="device" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <div className='flex flex-col m-1'>
                    <label className="label">
                        <span className="label-text">Бренд</span>
                    </label>
                        <select className="select select-bordered" defaultValue='' onChange={e => setTypeId(e.target.value)}>
                            <option value='' disabled>Выберите тип</option>
                            {types.map((type) => 
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )}
                        </select>
                        <label className="label">
                            <span className="label-text">Тип</span>
                        </label>
                        <select className="select select-bordered" defaultValue='' onChange={e => setBrandId(e.target.value)}>
                            <option value='' disabled>Выберите бренд</option>
                            {brands.map((brand) => 
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            )}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 justify-center mt-3 ml-2'>
                        <input type="text" placeholder="Название устройства" className="input input-bordered w-full max-w-xs"
                            value={name} onChange={e => setName(e.target.value)}
                        />
                        <input type="number" placeholder="Стоимость устройства" className="input input-bordered w-full max-w-xs"
                            value={price} onChange={e => setPrice(Number(e.target.value))}
                        />
                        <input type="file" className="input input-bordered w-full max-w-xs" title=""
                            onChange={selectFile}
                        />
                        <hr/>
                        <button onClick={() => addInfo()} className="btn">Добавить характеристики</button>
                        {info.map(i => 
                            <div key={i.id} className='flex flex-row items-center justify-between gap-3 border-b-gray-500 border-b p-1'>
                                <div className='flex flex-col gap-2'>
                                    <input type="text" placeholder="Имя характеристики" className="input input-bordered w-full max-w-xs"
                                        value={i.title} onChange={e => changeInfo('title', e.target.value, i.id)}
                                    />
                                    <input type="text" placeholder="Описание свойства" className="input input-bordered w-full max-w-xs"
                                        value={i.description} onChange={e => changeInfo('description', e.target.value, i.id)}
                                    />
                                </div>
                                <button onClick={() => removeInfo(i.id)} className="btn btn-outline btn-error">Удалить</button>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-row justify-end items-center m-2 p-1'>
                        <label htmlFor="device" className="btn btn-error mr-3">Закрыть</label>
                        <button className="btn btn-success" onClick={addDevice}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateDevice