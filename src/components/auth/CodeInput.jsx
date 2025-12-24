const CodeInput = ({
  value, 
  onChange, 
  onKeyDown, 
  inputRef, 
  index, 
  isLoading 
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, '');
    onChange(index, newValue.slice(0, 1));
  };

  const handleKeyDown = (e) => {
    onKeyDown(index, e);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength="1"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={`code-input ${index === 0 ? 'first' : ''}`}
      autoFocus={index === 0}
      disabled={isLoading}
    />
  );
};

export default CodeInput;
