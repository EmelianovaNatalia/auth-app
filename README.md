<div align="center">

# 🔐 React Authentication App

**Two-Factor Authentication with React Query & Error Handling**

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-orange?logo=vite)
![React Query](https://img.shields.io/badge/React_Query-5.0-red?logo=reactquery)

[🇺🇸 English](#-features) • [🇷🇺 Русский](#-особенности)

</div>

---

## 🇺🇸 English Version

### 📋 About

Modern React **19** authentication app with two-factor authentication (2FA) and comprehensive error handling. Built with the latest React features.

### ✨ Features

- 🔐 **Two-Step Authentication** - Login + 6-digit 2FA code
- 🛡️ **Error Handling** - All HTTP errors with user-friendly messages
- 🎨 **Modern UI** - Clean design with ABeeZee font
- 📱 **Responsive** - Works on all devices
- ⚡ **Latest Stack** - React 19 + Vite 7.2 + React Query 5

### 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173

🛠 Tech Stack

React 19 - Latest React version
Vite 7.2 - Modern build tool
React Query 5 - State management
CSS3 - Custom styling

📁 Structure

text
src/
├── App.jsx              # Main authentication logic
├── App.css              # Styles
└── main.jsx             # Entry point
🧪 Test Credentials

Login Step

Valid: Any email with @, password 6+ chars
Error test: wrong@example.com
2FA Step

Valid: Any 6-digit code (except test codes)
Error test: 111111 or 222222
📦 Scripts

bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Lint code
🇷🇺 Русская версия

📋 О проекте

Современное React 19 приложение для авторизации с двухфакторной аутентификацией (2FA) и обработкой ошибок. Использует последние возможности React.

✨ Особенности

🔐 Двухшаговая аутентификация - Логин + 6-значный код 2FA
🛡️ Обработка ошибок - Все HTTP ошибки с понятными сообщениями
🎨 Современный UI - Чистый дизайн со шрифтом ABeeZee
📱 Адаптивный - Работает на всех устройствах
⚡ Новейший стек - React 19 + Vite 7.2 + React Query 5
🚀 Быстрый старт

bash
# 1. Установить зависимости
npm install

# 2. Запустить сервер разработки
npm run dev

# 3. Открыть в браузере
# http://localhost:5173


🛠 Технологии

React 19 - Последняя версия React
Vite 7.2 - Современный сборщик
React Query 5 - Управление состоянием
CSS3 - Кастомные стили


📁 Структура

text
src/
├── App.jsx              # Основная логика авторизации
├── App.css              # Стили
└── main.jsx             # Точка входа
🧪 Тестовые данные

Шаг логина

Валидные: Любой email с @, пароль от 6 символов
Тест ошибки: wrong@example.com
Шаг 2FA

Валидные: Любой 6-значный код (кроме тестовых)
Тест ошибки: 111111 или 222222

📦 Скрипты

bash
npm run dev      # Запуск dev-сервера
npm run build    # Сборка для production
npm run preview  # Предпросмотр сборки
npm run lint     # Проверка кода
