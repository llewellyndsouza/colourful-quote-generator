import React, { useState, useCallback } from 'react';
import { ColorPicker, TextField } from '@shopify/polaris';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  const handleChange = useCallback((newValue) => setValue(newValue), []);
  return (
    <div
      style={{
        margin: '32px 37px',
      }}
    >
      <TextField label="Your quote" value={value} onChange={handleChange} autoComplete="off" placeholder="Enter a quote" />
      <br />
      <ColorPicker onChange={setColor} color={color} allowAlpha />
      <br />
      {/* Output comes here */}
    </div>
  );
}

export default App;
