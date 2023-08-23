import { useState, useEffect } from 'react'
import './App.css'
import {Button, FormControlLabel, Switch} from "@mui/material";
import { data } from './assets/data';

function App() {
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeSightWords, setIncludeSightWords] = useState(false);
  const [includeStates, setIncludeStates] = useState(false);
  const [pool, setPool] = useState(["2023", "Mandi", "Burley"]);

  const [glyph, setGlyph] = useState<string>("^_^");

  const updatePool = () => {
    let pool = [];
    if (includeNumbers) pool = [...pool, ...data.easyNumbers];
    if (includeUppercase) pool = [...pool, ...data.lettersUppercase];
    if (includeLowercase) pool = [...pool, ...data.lettersUppercase.map((letter) => letter.toLowerCase())];
    if (includeSightWords) pool = [...pool, ...data.sightWords];
    if (includeStates) pool = [...pool, ...data.states];
    setPool(pool);
  }

  const generateRandomGlyph = () => {
    const randomIdx = Math.floor(Math.random() * pool.length);
    setGlyph(pool[randomIdx]);
  }

  useEffect(() => {
    updatePool();
  }, [includeNumbers, includeUppercase, includeLowercase, includeSightWords, includeStates]);

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

  const handleToggleStates = () => {
    setIncludeStates((prev) => !prev);
  };

  return (
    <>
    <div className="app-container">
      <h1>{glyph}</h1>
      <div className="card">
        <Button variant="contained" size="large" className="heckinButton" onClick={() => generateRandomGlyph()}>
          Generate a random glyph
        </Button>
      </div>

      <br/>
    </div>

    <div className="switch-container">
      <div className="switch-container-column">
        <FormControlLabel control={<Switch checked={includeUppercase} onChange={() => handleToggleUppercase()} />} label="Uppercase" />
        <FormControlLabel control={<Switch checked={includeLowercase} onChange={() => handleToggleLowercase()} />} label="Lowercase" />
        <FormControlLabel control={<Switch checked={includeNumbers} onChange={() => handleToggleNumbers()} />} label="Numbers" />
      </div>

      <div>
        <FormControlLabel control={<Switch checked={includeSightWords} onChange={() => handleToggleSightWords()} />} label="Sight Words" />
        <FormControlLabel control={<Switch checked={includeStates} onChange={() => handleToggleStates()} />} label="U.S. States" />
      </div>
    </div>
    </>
  )
}

export default App
