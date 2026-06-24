import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ type, value, label, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>

      <div className='input-box'>
        <input
          className='w-full bg-transparent outline-none'
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                className='text-primary cursor-pointer'
                size={22}
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                className='text-slate-400 cursor-pointer'
                size={22}
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
