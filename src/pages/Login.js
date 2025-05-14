import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { login, reset } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={onSubmit}>
        <LoginHeader>
          <h1>
            <FaUser /> Login
          </h1>
          <p>Please log in to your account</p>
        </LoginHeader>

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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </FormGroup>

        <RegisterLink>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const LoginHeader = styled.div`
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

const RegisterLink = styled.div`
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

export default Login; 