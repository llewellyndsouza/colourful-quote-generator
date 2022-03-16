import React from 'react';
import { ColorPicker, TextField } from '@shopify/polaris';
import debounce from 'lodash.debounce';

import './App.css';

function hslToHex(h, s, l, alpha) {
  l /= 100;
  alpha = Math.round(255 * alpha)
    .toString(16)
    .padStart(2, '0');
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}${alpha}`;
}

const refreshImage = async ({ quote, color, setImage }) => {
  // console.log({ quote, color });
  if (!(color && quote)) return;
  // console.log({ modified: hslToHex(color.hue, color.saturation * 100, color.brightness * 100, color.alpha) });
  const response = await fetch('http://localhost:3500/generate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quote,
      // color: HSLAToRGBA(color.hue, color.saturation, color.brightness, color.alpha),
      // color: hslToHex(color.hue, color.saturation, color.brightness),
      color: hslToHex(color.hue, color.saturation * 100, color.brightness * 100, color.alpha),
    }),
  });
  if (response.status === 200) {
    const data = await response.blob();
    const imgUrl = URL.createObjectURL(data);
    setImage(imgUrl);
  } else {
    console.log('Error fetching image');
    // handle errors here
  }
};

function App() {
  const [quote, setQuote] = React.useState('');
  const [color, setColor] = React.useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });
  const [image, setImage] = React.useState(null);
  const debouncedAPICall = React.useRef(debounce((nextVal) => refreshImage(nextVal), 1000)).current;

  React.useEffect(() => {
    debouncedAPICall({ quote, color, setImage });
  }, [quote, color, debouncedAPICall]);

  const handleChange = React.useCallback((newValue) => setQuote(newValue), []);

  return (
    <div
      style={{
        margin: '32px 37px',
      }}
    >
      <TextField label="Your quote" value={quote} onChange={handleChange} autoComplete="off" placeholder="Enter a quote" />
      <br />
      <ColorPicker onChange={setColor} color={color} allowAlpha />
      <br />
      {image && <img src={image} alt="generated content"></img>}
    </div>
  );
}

export default App;
