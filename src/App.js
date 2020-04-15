import React from 'react';
import './App.css';

import PlayArea from "./components/PlayArea"
import PlayModal from "./components/PlayModal"

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      gameOver: true,
      topScore:0
    };

    this.initCards = this.initCards.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  initCards() {
    this.setState({
      score: 0,
      gameOver: false
    });
  }

  restartGame(turns) {
    const score = Math.round(120 / turns * 100);

    this.setState({
      score: score,
      gameOver: true
    });

    if(score>this.state.topScore)
    {
      alert("It ain't much but it's honest work!\nNew High Score!")
      this.setState({topScore:score});
    }
  }


  render() {
    return (
      <div>
        <PlayModal
          gameOver={this.state.gameOver}
          highScore={this.state.score}
          onPlayClick={this.initCards}
          topScore={this.state.topScore}
        />
        <PlayArea
          gameOver={this.state.gameOver}
          onGameOver={this.restartGame}
        />
      </div>
    );
  }
}

export default App;
