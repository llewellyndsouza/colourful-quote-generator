const express = require('express');
const cors = require('cors');
const { createCanvas, registerFont } = require('canvas');
const CanvasTextWrapper = require('canvas-text-wrapper').CanvasTextWrapper;

const width = 1000;
const height = 500;
registerFont('fonts/Lato-Regular.ttf', { family: 'Lato' });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('YAY');
});

app.post('/generate', async (req, res) => {
  const { quote, color } = req.body;

  // create canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // add black to canvas
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);

  // add text to canvas
  context.fillStyle = color;

  CanvasTextWrapper(canvas, quote, {
    font: 'Lato',
    maxFontSizeToFill: 84,
    paddingX: 10,
    paddingY: 10,
    verticalAlign: 'middle',
    textAlign: 'center',
    sizeToFill: true,
  });

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.end(buffer);
});

app.listen(3500, () => {
  console.log(`Server started on port ${3500}`);
  console.log(`http://localhost:${3500}/`);
});
