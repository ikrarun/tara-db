'use client'
import React, { useEffect } from 'react'
import {Toaster,toast } from 'react-hot-toast'

function RootToast() {
    useEffect(() => {
        toast.dismiss();
        toast.success('It worked')
    },[])
  return (
    <Toaster position='top-right'/>
  )
}

export default RootToast