import './App.css';
import { useState } from 'react';
import Flashcard, { length, cards } from './components/Flashcard';

const App = () => {

  const [cardNum, setCardNum] = useState(0);
  const [cardSide, setCardSide] = useState("question");
  const [animate, setAnimate] = useState(true);
  const [check, setCheck] = useState("none");
  const [userAnswer, setUserAnswer] = useState("");

  const atStart = cardNum > 0 ? false : true;
  const atEnd = cardNum < length - 1 ? false : true;


  const prevCard = () => {
    if (!atStart) {
      setAnimate(false);
      setCardNum(cardNum - 1);
      setCardSide("question");
      setCheck("none");
      setUserAnswer("");
      requestAnimationFrame(() => setAnimate(true));
    }
  };

  const nextCard = () => {
    if (!atEnd) {
      setAnimate(false);
      setCardNum(cardNum + 1);
      setCardSide("question");
      setCheck("none");
      setUserAnswer("");
      requestAnimationFrame(() => setAnimate(true));
    }
  };

  const flipCard = () => {
    setCardSide(prev => prev === "question" ? "answer" : "question");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer === cards[cardNum].answer) {
      setCheck("correct");
    } else {
      setCheck("incorrect");
    }
  };

  return (
    <div className="App">
      <h1>🍁 Canadian Capital Quiz!</h1>
      <h2>It wouldn't be very polite not to know your neighbor's capitals. Get studying, eh?</h2>
      <p>Number of cards: {length}</p>
      <Flashcard cardNum={cardNum} cardSide={cardSide} animate={animate} onFlip={flipCard} />
      <div className="side-container">
        <h2>Guess the answer here:</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="answer"
            className={`textBox ${check}`}
            placeholder="Your answer..."
            autoComplete="off"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button type="submit" className={`${cardSide === "answer" ? "greyed" : ""}`}>Submit</button>
        </form>
      </div>
      <button className={`${atStart ? "greyed" : ""}`} onClick={prevCard}>←</button>
      <button className={`${atEnd ? "greyed" : ""}`} onClick={nextCard}>→</button>
    </div>
  );
};

export default App;
