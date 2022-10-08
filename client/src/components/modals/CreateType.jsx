import React, { useState } from 'react'
import { createType } from '../../http/deviceApi'

function CreateType() {
  const [name, setName] = useState('')

  const addType = () => {
    createType({name}).then(data => setName(''))
  }

  return (
    <div>
        <input type="checkbox" id="type" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box relative">
            <input type="text" placeholder="Введите название типа"
              className="input input-bordered w-full max-w-xs my-2"
              value={name} onChange={e => setName(e.target.value)}
             />
            <div className='flex flex-row justify-end items-center'>
                <label htmlFor="type" className="btn btn-error mr-3">Закрыть</label>
                <button className="btn btn-success" onClick={() => addType()}>Добавить</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CreateType