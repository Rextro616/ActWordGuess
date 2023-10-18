import "./App.css";
import React, { useState } from "react";

class Word {
  constructor(word) {
    this.word = word[0].split("");
    this.wordScrambled = this.scramble(word);
    this.wordOrder = word;
  }

  scramble(word) {
    let wordSplit = word[0].split("");
    let wordLenght = 5;

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
  const [disabled, setDisabled] = useState(true);
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  // const [value, setValue] = useState("");
  const [resultado, setResultado] = useState("");

  // let inputs = document.getElementsByClassName("entrada-texto");

  const [word, setWord] = useState();
  const [wordGame, setWordGame] = useState();
  const [wordScrambled, setWordScrambled] = useState("");
  const [wordOrder, setWordOrder] = useState("");
  const wordChange = (Event) => {
    setWord(word + Event.target.value.toLowerCase());
    let index = Event.target.id;

    if (wordGame[index - 1] !== Event.target.value.toLowerCase()) {
      if (Event.target.value !== "") {
        setErrores(errores + 1);
        getWord();

        if (errores === 3) {
          setDisabled(true);
          setResultado("Perdiste");
        }
      } else {
        let wordAux = word.split("");
        let wordAgain = "";
        wordAux.pop();
        wordAux.map((letter) => wordAgain = wordAgain + letter);
        setWord(wordAgain);
      }
    }

    if (word === wordOrder) {
      setAciertos(aciertos + 1);
    }

    if (aciertos === 10) {
      setResultado("Ganaste");
    }
  };

  const getWord = async () => {
    const baseURL = "https://random-word-api.herokuapp.com/word?length=5";

    const res = await fetch(`${baseURL}`);
    const data = await res.json();

    let wg = new Word(data);
    let order = "";

    setWordScrambled(wg.wordScrambled)

    setWordGame(wg.word);

    setWordOrder(wg.wordOrder);

    setWord("");
    clear();
    console.log(order);
    console.log(wg.word);
  };

  const start = () => {
    getWord();
    setAciertos(0);
    setErrores(0);
    setDisabled(false);
    setResultado("");
  }

  const clear = () => {
    // console.log(inputs)
    // inputs.map((input) => console.log(input));
  }

  return (
    <main className="main">
      <div className="palabras">
        <h1>{wordScrambled}</h1>
        <h1>{word}</h1>
        <h1>{wordOrder}</h1>
        <h1>{resultado}</h1>
      </div>

      <div className="resultados">
        <p>
          Errores: {errores}
        </p>
        <p>
          Aciertos: {aciertos}
        </p>
      </div>

      <div className="inputs">
        <input disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="1" />
        <input disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="2" />
        <input disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="3" />
        <input disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="4" />
        <input disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="5" />
      </div>

      <div className="buttons">
        <button onClick={start}>Restart</button>
      </div>

    </main>
  );
}

export default App;
