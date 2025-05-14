import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={onSubmit}>
        <RegisterHeader>
          <h1>
            <FaUser /> Sign Up
          </h1>
          <p>Create your FlickFusion account</p>
        </RegisterHeader>

        <FormGroup>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm your password"
            onChange={onChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </FormGroup>

        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </RegisterForm>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
`;

const RegisterForm = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 0.5rem;
    }
  }

  p {
    color: var(--text-gray);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--background-dark);
    color: var(--text-light);
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: var(--text-gray);

  a {
    color: var(--primary-color);
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Register; 