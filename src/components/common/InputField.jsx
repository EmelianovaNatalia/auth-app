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

// Компонент поля ввода
const InputField = ({ 
  type, 
  value, 
  onChange, 
  placeholder, 
  disabled, 
  hasError, 
  iconType = 'email' // 'email' или 'password'
}) => {
  const Icon = iconType === 'email' ? EmailIcon : PasswordIcon;
  
  return (
    <div className="form-input">
      <div className="form-item">
        <div className={`input-wrapper ${hasError ? 'error' : ''}`}>
          <Icon />
          <input
            type={type}
            value={value}
            onChange={onChange}
            className="input-field"
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
