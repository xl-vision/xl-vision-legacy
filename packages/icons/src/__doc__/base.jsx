import React from 'react'
import { AddCircleOutline, Alarm, Albums, ArrowBack, Reload } from '@xl-vision/icons'

export default () => {
  return (
    <div className='demo'>
      <AddCircleOutline size='2rem' />
      <Alarm size={32} />
      <Albums size={32} color='red' />
      <ArrowBack size={32} rotate={20} />
      <Reload size={32} />
    </div>
  )
}
