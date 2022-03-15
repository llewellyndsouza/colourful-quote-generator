const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('YAY');
});

app.post('/generate', async (req, res) => {});

app.listen(3500, () => {
  console.log(`Server started on port ${3500}`);
  console.log(`http://localhost:${3500}/`);
});
