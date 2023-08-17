import React from 'react'

export const nav = () => {
    return (
        <div className='w-full h-fit p-2 flex  bg-blue-700 text-white sticky top-0'>
            <div className='max-w-[900px]  mx-auto w-full inline-flex items-center justify-between'>
                <div className='font-bold text-xl'>TARA</div>
                <ul className='font-normal uppercase text-base inline-flex gap-3'>
                    <li>Help</li>
                    <li>Contacts</li>
                </ul>
            </div>
        </div>
    )
}

export default nav;