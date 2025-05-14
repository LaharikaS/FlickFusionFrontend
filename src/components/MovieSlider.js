import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const MovieSlider = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
        },
      },
    ],
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <SliderContainer>
      <SliderHeader>
        <SliderTitle>{title}</SliderTitle>
      </SliderHeader>
      <StyledSlider {...settings}>
        {movies.map((movie) => (
          <SliderItem key={movie._id}>
            <MovieCard movie={movie} />
          </SliderItem>
        ))}
      </StyledSlider>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  margin-bottom: 3rem;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SliderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-light);
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    margin-left: 0;
  }

  .slick-slide {
    padding: 0 10px;
  }

  .slick-prev,
  .slick-next {
    z-index: 10;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--primary-color);
    }

    &:before {
      font-size: 20px;
    }
  }

  .slick-prev {
    left: -10px;
  }

  .slick-next {
    right: -10px;
  }

  @media (max-width: 768px) {
    .slick-prev {
      left: 0;
    }

    .slick-next {
      right: 0;
    }
  }
`;

const SliderItem = styled.div`
  height: 100%;
`;

export default MovieSlider; 