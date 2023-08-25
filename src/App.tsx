import { useState, useEffect } from 'react'
import './App.css'
import {Box, Button, FormControlLabel, Switch, Tab, Tabs} from "@mui/material";
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

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className={"tab-container"}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
    <div className="app-container">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="app-tabs">
          <Tab label="memcards" {...a11yProps(0)} />
          <Tab label="settings" {...a11yProps(1)} />
        </Tabs>

        <CustomTabPanel value={activeTab} index={0}>
          <div className="mem-card-container">
            <div className="glyph-container">
              <div>{glyph}</div>
            </div>
            <div>
              <Button variant="contained" size="large" className="heckinButton" onClick={() => generateRandomGlyph()}>
                Generate a random glyph
              </Button>
            </div>
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={1}>
          <div className="switch-container">
            <div className="switch-container-column">
              <FormControlLabel className="switch-item" control={<Switch checked={includeUppercase} onChange={() => handleToggleUppercase()} />} label="Uppercase" />
              <FormControlLabel className="switch-item" control={<Switch checked={includeLowercase} onChange={() => handleToggleLowercase()} />} label="Lowercase" />
              <FormControlLabel className="switch-item" control={<Switch checked={includeNumbers} onChange={() => handleToggleNumbers()} />} label="Numbers" />
              <FormControlLabel className="switch-item" control={<Switch checked={includeSightWords} onChange={() => handleToggleSightWords()} />} label="Sight Words" />
              <FormControlLabel className="switch-item" control={<Switch checked={includeStates} onChange={() => handleToggleStates()} />} label="U.S. States" />
            </div>
          </div>
        </CustomTabPanel>

        <div className="app-title">memcards v0.1</div>
      </div>
    </>
  )
}

export default App
