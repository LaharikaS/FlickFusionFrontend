import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <Link to={slide.link} className="carousel-link">
              <img src={slide.image} alt={slide.title} className="carousel-image" />
              <div className="carousel-caption">
                <h2>{slide.title}</h2>
                {slide.subtitle && <p>{slide.subtitle}</p>}
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <button className="carousel-control prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left">❮</i>
      </button>
      
      <button className="carousel-control next" onClick={nextSlide}>
        <i className="fas fa-chevron-right">❯</i>
      </button>
      
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;