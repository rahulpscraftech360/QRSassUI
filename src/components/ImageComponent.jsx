import React, { useState } from "react";

const ImageComponent = ({ backgroundImage }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="relative rounded-md w-[100%] h-[300px]  bg-slate-100 mt-3 ">
      {backgroundImage && (
        <img
          className="   absolute  object-scale-down "
          src={backgroundImage}
          alt="background image"
          draggable="false"
          //   style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          onMouseMove={handleDrag}
        />
      )}
    </div>
  );
};

export default ImageComponent;
