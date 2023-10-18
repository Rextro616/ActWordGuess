import "./App.css";
import React, { useRef, useState } from "react";

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
  const [resultado, setResultado] = useState("");
  const [value, setValue] = useState("Iniciar");

  let inputs = document.getElementsByClassName("entrada-texto");

  const [word, setWord] = useState();
  const [wordGame, setWordGame] = useState();
  const [wordScrambled, setWordScrambled] = useState("");
  const [wordOrder, setWordOrder] = useState("");
  const uno = useRef();
  const dos = useRef();
  const tres = useRef();
  const cuatro = useRef();
  const cinco = useRef();

  const wordChange = (Event) => {
    setWord(word + Event.target.value.toLowerCase());
    let index = Event.target.id;

    if (index == 1){
      dos.current?.focus();
    } else if (index == 2){
      tres.current?.focus();
    } else if (index == 3){
      cuatro.current?.focus();
    } else if (index == 4){
      cinco.current?.focus();
    } 


    if (wordGame[index - 1] !== Event.target.value.toLowerCase()) {
      if (Event.target.value !== "") {
        setErrores(errores + 1);
        getWord();

        if (errores === 3) {
          setDisabled(true);
          setResultado("Perdiste");
          setValue("Reiniciar");
        }

      } else {
        let wordAux = word.split("");
        let wordAgain = "";
        wordAux.pop();
        wordAux.map((letter) => wordAgain = wordAgain + letter);
        setWord(wordAgain);
      }
    }

    if ((word + Event.target.value.toLowerCase()) === wordOrder[0]) {
      setAciertos(aciertos + 1);
      getWord();
      if (aciertos === 9) {
        setDisabled(true);
        setResultado("Ganaste");
        setValue("Reiniciar");
      }
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

    uno.current?.focus();

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
    let array = Array.prototype.slice.call(inputs)
    array.map((input) => input.value = "");
  }

  return (
    <main className="main">
      <div className="palabras">
        <h1>{wordScrambled}</h1>
        <h1>{word}</h1>
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
        <input ref={uno} disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="1" />
        <input ref={dos} disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="2" />
        <input ref={tres} disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="3" />
        <input ref={cuatro} disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="4" />
        <input ref={cinco} disabled={disabled} maxLength={1} onChange={wordChange} className="entrada-texto" type="text" id="5" />
      </div>

      <div className="buttons">
        <button onClick={start}>{value}</button>
      </div>

    </main>
  );
}

export default App;
