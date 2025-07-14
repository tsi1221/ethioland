import React, { useState } from "react";
import "./Slider.css";

const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="slider">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="slider-image"
      />
      {total > 1 && (
        <>
          <button className="slider-btn left" onClick={prevSlide}>
            ‹
          </button>
          <button className="slider-btn right" onClick={nextSlide}>
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
