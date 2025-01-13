import React from 'react'
import Canvas from '../../../components/Global/Canvas'
import { FaClock } from 'react-icons/fa'

const Response = () => {
  return (
    <Canvas
      title="Responding message"
      id="canvasResponse"
      buttonClass="btn btn-sm btn-purple"
      buttonText="Response pending"
      icon={<FaClock />}
    ></Canvas>
  )
}

export default Response
