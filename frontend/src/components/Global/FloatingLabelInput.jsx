const FloatingLabelInput = ({
  type = "text",
  inputId = "default",
  placeholder = "default",
  value = "",
  setValue = null,
  setClass = "",
  dataList = null,
}) => {
  return (
    <div className="formgroup__animated mb-3">
      <input
        type={type}
        id={inputId}
        className={`input__animated ${setClass}`}
        placeholder=" "
        onChange={setValue}
        defaultValue={value}
        required
        list={dataList}
      />
      <label htmlFor={inputId} className="animated__label">
        {placeholder === "" ? "default" : placeholder}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
