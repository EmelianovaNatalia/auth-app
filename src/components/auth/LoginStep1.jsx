import { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginStep1 = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (error) {
      setGeneralError(error.message || 'Произошла ошибка');
      setFieldErrors(error.errors || {});
    } else {
      setGeneralError('');
      setFieldErrors({});
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});
    onSubmit(email, password);
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <>
      <div className="title-text">Sign in to your account to continue</div>

      {generalError && (
        <div className="global-error">
          ⚠️ {generalError}
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={isLoading}
          hasError={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <div className="input-caption">
            <div className="error-message">⚠️ {fieldErrors.email}</div>
          </div>
        )}

        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={isLoading}
          hasError={!!fieldErrors.password}
        />
        {fieldErrors.password && (
          <div className="input-caption">
            <div className="error-message">⚠️ {fieldErrors.password}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className={`submit-button ${isFormValid ? 'primary-button' : 'disabled'}`}
        >
          {isLoading ? <LoadingSpinner /> : 'Log in'}
        </button>
      </form>
    </>
  );
};

export default LoginStep1;
