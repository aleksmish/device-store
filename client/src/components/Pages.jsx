import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../store/deviceSlice'

function Pages() {
    const totalCount = useSelector(state => state.device.totalCount)
    const limit = useSelector(state => state.device.limit)
    const curPage = useSelector(state => state.device.page)
    const dispatch = useDispatch()
    const pages = []
    const pageCount = Math.ceil(totalCount / limit)

    for(let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    return (
        <div className="btn-group m-5">
            {pages.map(page =>
                <button key={page} className={`btn ${curPage === page ? "btn-active" : ""}`} onClick={() => dispatch(setPage(page))}>{page}</button>    
            )}
        </div>
    )
}

export default Pages