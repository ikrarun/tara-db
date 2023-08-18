'use client'
import React, { useState } from 'react'

const Searchbar = () => {
    const [searchtext, setSearchText] = useState('');
    return (
        <div className='flex flex-col h-full w-full items-center justify-center'>

            <div className='border-2 rounded-full w-full  py-4 px-8 border-blue-700/75'>
                <input type="search" value={searchtext} onChange={(e) => { setSearchText(e.target.value) }} className='placeholder:text-blue-700/75 text-blue-700 text-xl outline-none ring-0 w-full' placeholder='Search' autoComplete='off' name="searchfield" id="searchfield" />

            </div>
            <button type="button" className='text-white w-fit self-center mt-3 p-2 rounded-full px-4 text-xl bg-blue-700'> Search</button >
        </div>)
}

export default Searchbar