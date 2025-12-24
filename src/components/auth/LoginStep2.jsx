import { useState, useEffect, useRef } from 'react';
import CodeInput from './CodeInput';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginStep2 = ({ onSubmit, isLoading, error, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (error) {
      setGeneralError(error.message || 'Произошла ошибка');
      setFieldErrors(error.errors || {});
    } else {
      setGeneralError('');
      setFieldErrors({});
    }
  }, [error]);

  useEffect(() => {
    if (error?.status === 401) {
      setCode(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [error]);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onSubmit(fullCode);
    }
  };

  const isCodeValid = code.every(digit => digit !== '');

  return (
    <>
      <button className="back-button" onClick={onBack} type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="rgba(0, 0, 0, 0.88)"/>
        </svg>
      </button>

      <div className="title-text">Two-Factor Authentication</div>
      <div className="subtitle-text">
        Enter the 6-digit code from the Google
      </div>
      <div className="tfa-info">
        Authenticator app
      </div>

      {generalError && (
        <div className="global-error">
          ⚠️ {generalError}
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="code-container">
          <div className="code-inputs">
            {code.map((digit, index) => (
              <CodeInput
                key={index}
                value={digit}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                inputRef={(el) => (inputRefs.current[index] = el)}
                index={index}
                isLoading={isLoading}
              />
            ))}
          </div>

          {fieldErrors.code && (
            <div className="input-caption" style={{ marginTop: '8px' }}>
              <div className="error-message">⚠️ {fieldErrors.code}</div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !isCodeValid}
          className={`submit-button ${isCodeValid ? 'primary-button' : 'disabled'}`}
        >
          {isLoading ? <LoadingSpinner /> : 'Continue'}
        </button>
      </form>
    </>
  );
};

export default LoginStep2;
