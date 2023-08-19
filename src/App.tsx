import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeSightWords, setIncludeSightWords] = useState(false);
  const [pool, setPool] = useState(["2023", "Mandi", "Burley"]);

  const [glyph, setGlyph] = useState<string | number>("^_^");
  const easyNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
  const lettersUppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const lettersLowercase = lettersUppercase.map((letter) => letter.toLowerCase());
  const sightWords = ["the", "and", "Liz", "Alex", "Mama", "Daddy", "Illinois", "kid", "but", "one", "five", "tablet", "baby", "water"];

  const updatePool = () => {
    let pool = [];
    if (includeNumbers) pool = [...pool, ...easyNumbers];
    if (includeUppercase) pool = [...pool, ...lettersUppercase];
    if (includeLowercase) pool = [...pool, ...lettersLowercase];
    if (includeSightWords) pool = [...pool, ...sightWords];
    setPool(pool);
  }

  const generateRandomGlyph = () => {
    const randomIdx = Math.floor(Math.random() * pool.length);
    setGlyph(pool[randomIdx]);
  }

  useEffect(() => {
    updatePool();
  }, [includeNumbers, includeUppercase, includeLowercase, includeSightWords]);

  const handleToggleUppercase = () => {
    setIncludeUppercase((prev) => !prev);
  };

  const handleToggleLowercase = () => {
    setIncludeLowercase((prev) => !prev);
  };

  const handleToggleNumbers = () => {
    setIncludeNumbers((prev) => !prev);
  };

  const handleToggleSightWords = () => {
    setIncludeSightWords((prev) => !prev);
  };

  return (
    <>
      <h1>{glyph}</h1>
      <div className="card">
        <button onClick={() => generateRandomGlyph()}>
          Generate a random glyph
        </button>
      </div>

      <br/>

      <div>
        <label>
          <input type="checkbox" checked={includeUppercase} onChange={() => handleToggleUppercase()}/>
          Uppercase
        </label>

        <label>
          <input type="checkbox" checked={includeLowercase} onChange={() => handleToggleLowercase()}/>
          Lowercase
        </label>

        <label>
          <input type="checkbox" checked={includeNumbers} onChange={() => handleToggleNumbers()}/>
          Numbers
        </label>

        <label>
          <input type="checkbox" checked={includeSightWords} onChange={() => handleToggleSightWords()}/>
          Sight Words
        </label>
      </div>
    </>
  )
}

export default App
