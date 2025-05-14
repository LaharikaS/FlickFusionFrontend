import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { getMovieById } from '../redux/slices/movieSlice';
import Spinner from '../components/Spinner';

const Watch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, isLoading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, id]);

  if (isLoading || !movie) {
    return <Spinner />;
  }
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
  
    try {
      const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return null;
    }
  };
  
  
  const trailerId = getYouTubeVideoId(movie.trailerUrl);
  console.log("Trailer ID:", trailerId);
  console.log("Trailer URL:", movie.trailerUrl);

  return (
    <WatchContainer>
      <BackButton to={`/movie/${id}`}>
        <FaArrowLeft /> Back to movie
      </BackButton>
      <VideoContainer>
        <VideoTitle>{movie.title}</VideoTitle>
        {/* <VideoPlayer> */}
        <iframe
          width="100%"
          height="650"
          src={`https://www.youtube.com/embed/${trailerId}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

          
        {/* </VideoPlayer> */}
        <VideoInfo>
          <VideoInfoTitle>Now Playing: {movie.title}</VideoInfoTitle>
          <VideoInfoDescription>{movie.description}</VideoInfoDescription>
        </VideoInfo>
      </VideoContainer>
    </WatchContainer>
  );
};

const WatchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #e50914;
  }
`;

const VideoContainer = styled.div`
  background-color: #0b0b0b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const VideoTitle = styled.h1`
  font-size: 1.5rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;

const VideoPlayer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
  }
`;

const VideoInfo = styled.div`
  padding: 1.5rem;
`;

const VideoInfoTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
`;

const VideoInfoDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

export default Watch; 