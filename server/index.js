import express from 'express';
import cors from 'cors';
// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

import Chance from 'chance';
const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    name: chance.name(),
    animal: chance.animal(),
    age: chance.age(),
  };
});

console.log(animals);

app.get('/animals', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = animals.filter((animal) =>
    animal.animal.toLowerCase().includes(q)
  );
  res.send(results);
});

app.listen(8080, () => {
  console.log('Server started on 8080');
});
