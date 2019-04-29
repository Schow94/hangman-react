import React, { Component } from 'react';
import { randomWord } from './words';
// import AlphaButtons from './AlphaButtons';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  // if this.state.guessed has a letter in the answer, adds letter to an array
  guessedWord() {
    // console.log(this.state.guessed);
    console.log(this.state.answer);
    let gw = this.state.answer
      .split('')
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    console.log(gw);
    console.log(gw.join(''));
    return gw;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
    // this.state.guessed is an object
    // console.log(this.state.answer);
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  restart() {
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    }));
  }

  /** render: render game */
  render() {
    //these variables could be moved to their own method
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join('') === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = 'You win!';
    if (gameOver) gameState = 'You lose!';

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        {this.props.images[this.state.nWrong] ? (
          <img src={this.props.images[this.state.nWrong]} alt={altText} />
        ) : null}
        {this.state.nWrong > 0 ? (
          <p>Guessed wrong: {this.state.nWrong}</p>
        ) : null}
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">{gameState}</p>
        <button id="reset" onClick={this.restart}>
          New Game
        </button>
      </div>
    );
  }
}

export default Hangman;
