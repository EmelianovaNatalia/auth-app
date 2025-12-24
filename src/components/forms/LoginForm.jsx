import { useState } from 'react';
import LoginStep1 from '../auth/LoginStep1';
import LoginStep2 from '../auth/LoginStep2';
import Logo from '../common/Logo';

const LoginForm = ({ 
  loginMutation, 
  verify2FAMutation, 
  tempToken, 
  setTempToken 
}) => {
  // Текущий шаг: 1 = логин, 2 = 2FA
  const [step, setStep] = useState(1);

  // Обработка успешного логина
  const handleLoginSuccess = (data) => {
    console.log('✅ Логин успешен, требуется 2FA');
    setTempToken(data.tempToken);
    setStep(2); // Переходим к шагу 2FA
  };

  // Обработка успешной верификации 2FA
  const handle2FASuccess = (data) => {
    console.log('✅ 2FA успешна!', data);
    alert(`✅ Успешный вход!\nДобро пожаловать, ${data.user.name}`);
    // В реальном приложении:
    // localStorage.setItem('token', data.token);
    // window.location.href = '/dashboard';
  };

  // Обработка ошибок логина
  const handleLoginError = (error) => {
    console.log('❌ Ошибка логина:', error);
  };

  // Обработка ошибок 2FA
  const handle2FAError = (error) => {
    console.log('❌ Ошибка 2FA:', error);
  };

  // Отправка формы логина
  const handleLoginSubmit = (email, password) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: handleLoginSuccess,
        onError: handleLoginError
      }
    );
  };

  // Отправка кода 2FA
  const handle2FASubmit = (code) => {
    verify2FAMutation.mutate(
      code,
      {
        onSuccess: handle2FASuccess,
        onError: handle2FAError
      }
    );
  };

  // Возврат к первому шагу
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
          {/* Логотип */}
          <div className="logo-title">
            <div className="logo-placeholder">
              <Logo />
            </div>
          </div>

          {/* Рендер текущего шага */}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
