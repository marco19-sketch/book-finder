import "./CustomRadio.css";

const CustomRadio = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="custom-radio">
      <input
        tabIndex='0'
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="radio-mark" />
      {label}
    </label>
  );
};

export default CustomRadio;
