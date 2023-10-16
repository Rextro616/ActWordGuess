import "./App.css";
import React, { useState, useEffect } from "react";


class Word {
  constructor(word) {
    this.word = this.scramble(word);
  }

  scramble(word){
    let wordSplit = word.split('');
    // word.map((letter) => wordSplit.push(letter));
    let wordLenght = wordSplit.lenght;
    return wordSplit;
  }

}


const getWord = async () => {
  const baseURL = "https://random-word-api.herokuapp.com/word?length=5";

  const res = await fetch(`${baseURL}`);
  const data = await res.json();

  let wordGame = new Word(data);

  console.log(wordGame);
};

function App() {

  const [word, setWord] = useState();

  const wordChange = (Event) => {
    setWord(Event.target.value);
    console.log(word);
  };

  return (
    <main>
      <input onChange={wordChange} className="entrada-texto" type="text" />
      <button onClick={getWord}>Restart</button>
    </main>
  );
}

export default App;
