import "./App.css";
import React, { useState } from "react";

class Word {
  constructor(word) {
    this.word = word;
    this.wordScrambled = this.scramble(word);
  }

  scramble(word) {
    let wordSplit = word[0].split("");
    let wordLenght = 5;
    console.log(wordLenght)

    for (let i = wordLenght - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = wordSplit[i];
      wordSplit[i] = wordSplit[j];
      wordSplit[j] = tmp;
    }

    return wordSplit
  }

}

function App() {
  const [word, setWord] = useState();
  const [wordScrambled, setWordScrambled] = useState("");

  const wordChange = (Event) => {
    setWord(Event.target.value.toLowerCase());


  };

  const getWord = async () => {
    const baseURL = "https://random-word-api.herokuapp.com/word?length=5";

    const res = await fetch(`${baseURL}`);
    const data = await res.json();

    let wordGame = new Word(data);

    setWordScrambled(wordGame.wordScrambled)

    console.log(wordGame);
  };

  return (
    <main className="main">
      <h1>{wordScrambled}</h1>

      <div>
        
      </div>

      <div className="inputs">
        <input maxLength={1} onChange={wordChange} className="entrada-texto" type="text" />
        <input maxLength={1} onChange={wordChange} className="entrada-texto" type="text" />
        <input maxLength={1} onChange={wordChange} className="entrada-texto" type="text" />
        <input maxLength={1} onChange={wordChange} className="entrada-texto" type="text" />
        <input maxLength={1} onChange={wordChange} className="entrada-texto" type="text" />
      </div>

      <div className="buttons">
        <button onClick={getWord}>Restart</button>
      </div>

    </main>
  );
}

export default App;
