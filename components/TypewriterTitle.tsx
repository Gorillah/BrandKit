import React from 'react'
import Typewriter from 'typewriter-effect';

type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
        options={{
            loop: true
        }}
        onInit={(typewriter) => {
            typewriter
            .typeString('Logo Maker')
            .pauseFor(1000)
            .deleteAll()
            .typeString('Number one AI logo generator')
            .start();
        }}
    />
  )
}

export default TypewriterTitle