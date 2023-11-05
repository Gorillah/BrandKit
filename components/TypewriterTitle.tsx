import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("⭐The #1 AI Logo Maker")
          .pauseFor(1000)
          .deleteAll()
          .typeString("⚡Logos Fast as Lightning")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
