import { Button } from 'flowbite-react'
import React from 'react'

export default function 
() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-[#3688B7]
    justify-center items-center rounded text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>Come check out some stuff</h2>
            <p className='text-gray-500 my-2'>Some more words</p>
            <Button gradientDuoTone='purpleToPink'>
                <a href="https://www.upstate-exposure.com" target='_blank'
                rel='noopner noreferrer'>
                    Push me
                </a>
            </Button>
        </div>
        <div className='flex-1 p-7'>
            <img src="https://share.icloud.com/photos/057nFcvwR87OBHSj5YQSvFeeA"/>
        </div>
    </div>
  )
}
