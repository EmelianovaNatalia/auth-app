export const loginApi = async (email, password) => {
  console.log('📡 Отправка запроса на логин:', { email, password });
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
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

  if (email === 'wrong@example.com') {
    throw {
      status: 401,
      message: 'Неверный email или пароль'
    };
  }
  
  return {
    requires2FA: true,
    message: 'Требуется двухфакторная аутентификация',
    tempToken: 'temp-token-for-2fa'
  };
};

export const verify2FAApi = async (code, tempToken) => {
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
  
  return {
    user: {
      id: 1,
      name: 'Тестовый Пользователь',
      email: 'user@example.com'
    },
    token: 'jwt-token-12345'
  };
};
