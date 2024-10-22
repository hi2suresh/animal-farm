import { useState, useEffect } from 'react';
import './App.css';

function useAnimals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const prev = localStorage.getItem('lastQuery') || [];
    setAnimals(prev);
  }, []);
  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080/animals?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);
    localStorage.setItem('lastQuery', animals);
  };

  return { search, animals };
}

function App() {
  const { search, animals } = useAnimals();
  return (
    <>
      <h1>Animal Search</h1>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => console.log(search(e.target.value))}
      />
      <ul>
        {animals.map((animal) => (
          <Animal
            key={animal.id}
            animal={animal.animal}
            name={animal.name}
            age={animal.age}
          />
        ))}
      </ul>
    </>
  );
}

function Animal({ animal, name, age }) {
  return (
    <li>
      Name: {name} Animal: <strong>{animal}</strong> Age: {age}
    </li>
  );
}

export default App;
