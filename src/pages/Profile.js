import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, reset } from '../redux/slices/authSlice';
import { getFavorites } from '../redux/slices/movieSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { FaUser, FaEnvelope, FaLock, FaHeart } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const { favorites, isLoading: favoritesLoading } = useSelector(
    (state) => state.movies
  );

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('profile');

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Profile updated successfully');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
      name,
      email,
    };

    if (password) {
      userData.password = password;
    }

    dispatch(updateProfile(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>My Account</ProfileTitle>
      </ProfileHeader>

      <TabsContainer>
        <TabButton
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser /> Profile
        </TabButton>
        {/* <TabButton
          active={activeTab === 'favorites'}
          onClick={() => setActiveTab('favorites')}
        >
          <FaHeart /> Favorites
        </TabButton> */}
      </TabsContainer>

      {activeTab === 'profile' ? (
        <ProfileForm onSubmit={onSubmit}>
          <FormGroup>
            <FormLabel>
              <FaUser /> Name
            </FormLabel>
            <FormInput
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <FaEnvelope /> Email
            </FormLabel>
            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <FaLock /> Password
            </FormLabel>
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter new password (leave blank to keep current)"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <FaLock /> Confirm Password
            </FormLabel>
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm new password"
            />
          </FormGroup>

          <SubmitButton type="submit">Update Profile</SubmitButton>
        </ProfileForm>
      ) : (
        <FavoritesSection>
          <SectionTitle>
            <FaHeart /> My Favorites
          </SectionTitle>
          {favoritesLoading ? (
            <Spinner />
          ) : favorites && favorites.length > 0 ? (
            <MoviesGrid>
              {favorites.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </MoviesGrid>
          ) : (
            <NoFavorites>
              <p>You haven't added any movies to your favorites yet.</p>
            </NoFavorites>
          )}
        </FavoritesSection>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#f84464' : '#fff')};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
  border-bottom: 2px solid ${({ active }) => (active ? '#f84464' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    color: #f84464;
  }
`;

const ProfileForm = styled.form`
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #f84464;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #f84464;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color:rgb(197, 15, 49);
    transform: translateY(-2px);
  }
`;

const FavoritesSection = styled.div``;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;

  svg {
    color: #e50914;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const NoFavorites = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  p {
    font-size: 1.2rem;
    color: #ccc;
  }
`;

export default Profile; 