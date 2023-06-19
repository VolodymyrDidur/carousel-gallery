import React, { useState } from "react";

export const Carousel: React.FC<{ images: any[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickDot = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={index === activeIndex ? 'active' : ''}
          />
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => handleClickDot(index)}
          />
        ))}
      </div>
      <button className="carousel-button prev" onClick={handlePrev}>
        Prev
      </button>
      <button className="carousel-button next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};
