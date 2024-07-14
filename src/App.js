import WordDetail from './components/WordDetail';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchWord(userInput);
    console.log('User input:', userInput);
    // setUserInput('');
  };

  return (
    <div className="home">
      <div className='heading'><span>W</span>ord <span>S</span>earch</div>

      <form onSubmit={handleSearch} className='input-container'>
        <input
          type="text"
          placeholder="Enter a word"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {searchWord && <WordDetail word={searchWord} key={searchWord} />}
      <Footer />
    </div>
  );
}

export default App;
