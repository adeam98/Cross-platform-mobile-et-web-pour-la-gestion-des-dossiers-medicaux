import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let medicines = [];

app.post('/api/medicines', (req, res) => {
  const newMedicine = {
    id: Date.now(),
    name: req.body.name
  };
  medicines.push(newMedicine);
  res.status(201).json(newMedicine);
});

app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});
