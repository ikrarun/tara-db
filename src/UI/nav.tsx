import Link from 'next/link';
import React from 'react'

export const nav = () => {
    return (
        <div className='w-full h-fit p-2 flex  bg-blue-700 text-white fixed top-0'>
            <div className='max-w-[900px]  mx-auto w-full inline-flex items-center justify-between'>
                <Link href={'/'} className='text-xl'>TARA-DB</Link>
            </div>
        </div>
    )
}

export default nav;