import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import './App.css';

// Иконки для полей
const EmailIcon = () => (
  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
  </svg>
);

const PasswordIcon = () => (
  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 3 12 3C13.71 3 15.1 4.29 15.1 6V8Z" fill="currentColor"/>
  </svg>
);

// Создаем клиент React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Моковый API
const mockApi = {
  login: async (email, password) => {
    console.log('📡 Отправка запроса на логин:', { email, password });
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 🔴 Ошибки валидации
    if (!email.trim()) {
      throw {
        status: 400,
        message: 'Email обязателен',
        errors: { email: ['Email не может быть пустым'] }
      };
    }
    
    if (!password.trim()) {
      throw {
        status: 400,
        message: 'Пароль обязателен',
        errors: { password: ['Пароль не может быть пустым'] }
      };
    }
    
    if (!email.includes('@')) {
      throw {
        status: 400,
        message: 'Неверный формат email',
        errors: { email: ['Email должен содержать @'] }
      };
    }
    
    if (password.length < 6) {
      throw {
        status: 400,
        message: 'Слишком короткий пароль',
        errors: { password: ['Пароль должен быть минимум 6 символов'] }
      };
    }
    
    // 🔴 Ошибка: неверные учетные данные
    if (email === 'wrong@example.com') {
      throw {
        status: 401,
        message: 'Неверный email или пароль'
      };
    }
    
    // ✅ Успешный ответ - требование 2FA
    return {
      requires2FA: true,
      message: 'Требуется двухфакторная аутентификация',
      tempToken: 'temp-token-for-2fa'
    };
  },
  
  verify2FA: async (code, tempToken) => {
    console.log('📡 Проверка 2FA кода:', { code });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!code || code.length !== 6) {
      throw {
        status: 400,
        message: 'Неверный код',
        errors: { code: ['Код должен содержать 6 цифр'] }
      };
    }
    
    if (code === '111111') {
      throw {
        status: 401,
        message: 'Неверный код 2FA'
      };
    }
    
    if (code === '222222') {
      throw {
        status: 429,
        message: 'Слишком много попыток. Попробуйте позже'
      };
    }
    
    // ✅ Успешная верификация
    return {
      user: {
        id: 1,
        name: 'Тестовый Пользователь',
        email: 'user@example.com'
      },
      token: 'jwt-token-12345'
    };
  }
};

// Спиннер загрузки
const LoadingSpinner = () => (
  <div className="spinner">
    <div className="spinner-dot"></div>
    <div className="spinner-dot"></div>
    <div className="spinner-dot"></div>
  </div>
);

// Компонент поля ввода для 2FA кода
const CodeInput = ({ value, onChange, onKeyDown, inputRef, index }) => (
  <input
    ref={inputRef}
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    maxLength="1"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    className={`code-input ${index === 0 ? 'first' : ''}`}
    autoFocus={index === 0}
  />
);

// Логотип как на макете (синий круг с белым кругом внутри)
const Logo = () => (
  <div className="_logo-placeholder">
    <div className="logo-symbol">
      <div className="logo-symbol-inner"></div>
    </div>
    <div className="text-wrapper">
      <div className="company-text">Company</div>
    </div>
  </div>
);

// Компонент для шага 1 - Ввод email/пароля
function LoginStep1({ onSubmit, isLoading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Обработка ошибок
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
      {/* Заголовок */}
      <div className="title-text">Sign in to your account to continue</div>

      {/* Общая ошибка */}
      {generalError && (
        <div className="global-error">
          ⚠️ {generalError}
        </div>
      )}

      {/* Форма */}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Поле Email */}
        <div className="form-input">
          <div className="form-item">
            <div className={`input-wrapper ${fieldErrors.email ? 'error' : ''}`}>
              <EmailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Email"
                disabled={isLoading}
              />
            </div>
            {fieldErrors.email && (
              <div className="input-caption">
                <div className="error-message">⚠️ {fieldErrors.email}</div>
              </div>
            )}
          </div>
        </div>

        {/* Поле Пароль */}
        <div className="form-input">
          <div className="form-item">
            <div className={`input-wrapper ${fieldErrors.password ? 'error' : ''}`}>
              <PasswordIcon />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field password-input"
                placeholder="Password"
                disabled={isLoading}
              />
            </div>
            {fieldErrors.password && (
              <div className="input-caption">
                <div className="error-message">⚠️ {fieldErrors.password}</div>
              </div>
            )}
          </div>
        </div>

        {/* Кнопка отправки */}
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
}

// Компонент для шага 2 - 2FA
function LoginStep2({ onSubmit, isLoading, error, onBack }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const inputRefs = useRef([]);

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      setGeneralError(error.message || 'Произошла ошибка');
      setFieldErrors(error.errors || {});
    } else {
      setGeneralError('');
      setFieldErrors({});
    }
  }, [error]);

  // Очистка кода при ошибке
  useEffect(() => {
    if (error?.status === 401) {
      setCode(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [error]);

  const handleCodeChange = (index, value) => {
    // Разрешаем только цифры
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);

    // Автоматически переходим к следующему полю
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Обработка Backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Обработка стрелок
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
      {/* Кнопка назад */}
      <button className="back-button" onClick={onBack} type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="rgba(0, 0, 0, 0.88)"/>
        </svg>
      </button>

      {/* Заголовок */}
      <div className="title-text">Two-Factor Authentication</div>
      <div className="subtitle-text">
        Enter the 6-digit code from the Google
      </div>
      <div className="tfa-info">
        Authenticator app
      </div>

      {/* Общая ошибка */}
      {generalError && (
        <div className="global-error">
          ⚠️ {generalError}
        </div>
      )}

      {/* Форма */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="code-container">
          {/* 6 полей для кода */}
          <div className="code-inputs">
            {code.map((digit, index) => (
              <CodeInput
                key={index}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                index={index}
              />
            ))}
          </div>

          {/* Ошибка для кода */}
          {fieldErrors.code && (
            <div className="input-caption" style={{ marginTop: '8px' }}>
              <div className="error-message">⚠️ {fieldErrors.code}</div>
            </div>
          )}
        </div>

        {/* Кнопка отправки */}
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
}

// Главный компонент формы логина
function LoginForm() {
  const [step, setStep] = useState(1); // 1 = email/password, 2 = 2FA
  const [tempToken, setTempToken] = useState('');

  // Мутация для логина (шаг 1)
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => mockApi.login(email, password),
    onSuccess: (data) => {
      console.log('✅ Логин успешен, требуется 2FA');
      setTempToken(data.tempToken);
      setStep(2); // Переходим к шагу 2FA
    },
    onError: (error) => {
      console.log('❌ Ошибка логина:', error);
    }
  });

  // Мутация для верификации 2FA (шаг 2)
  const verify2FAMutation = useMutation({
    mutationFn: (code) => mockApi.verify2FA(code, tempToken),
    onSuccess: (data) => {
      console.log('✅ 2FA успешна!', data);
      alert(`✅ Успешный вход!\nДобро пожаловать, ${data.user.name}`);
      // В реальном приложении:
      // localStorage.setItem('token', data.token);
      // window.location.href = '/dashboard';
    },
    onError: (error) => {
      console.log('❌ Ошибка 2FA:', error);
    }
  });

  const handleLoginSubmit = (email, password) => {
    loginMutation.mutate({ email, password });
  };

  const handle2FASubmit = (code) => {
    verify2FAMutation.mutate(code);
  };

  const handleBackToLogin = () => {
    setStep(1);
    loginMutation.reset();
    verify2FAMutation.reset();
  };

  // Определяем, какой шаг показывать
  const renderStep = () => {
    if (step === 1) {
      return (
        <LoginStep1
          onSubmit={handleLoginSubmit}
          isLoading={loginMutation.isPending}
          error={loginMutation.error}
        />
      );
    }

    if (step === 2) {
      return (
        <LoginStep2
          onSubmit={handle2FASubmit}
          isLoading={verify2FAMutation.isPending}
          error={verify2FAMutation.error}
          onBack={handleBackToLogin}
        />
      );
    }
  };

  return (
    <div className="sign-in-step">
      <div className="sign-in-wrapper">
        <div className="sign-in-card">
          {/* Логотип (показывается всегда) */}
          <div className="logo-title">
            <div className="logo-placeholder">
              <Logo />
            </div>
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  );
}

// Главный компонент приложения
function App() {
  return (
    <div className="auth-container">
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    </div>
  );
}

export default App;