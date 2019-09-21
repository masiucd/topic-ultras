import { useState } from 'react';

export default (initialValue = '') => {
  const [val, setVal] = useState(initialValue);
  const handleChange = e => {
    e.preventDefault();
    setVal(e.target.value);
  };
  const reset = () => {
    setVal('');
  };
  return [val, handleChange, reset];
};
