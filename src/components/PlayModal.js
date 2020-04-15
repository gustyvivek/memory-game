import React from "react";

class PlayModal extends React.Component {
  
    render() {
      return (
        <div className={this.props.gameOver ? "modal__wrapper" : "hidden"}>
          <div className="modal">
            <div className="modal--top overlay">
              <p>
                <b>High Score</b> : {this.props.topScore}.<br/>
                <b>Your Score</b> : {this.props.highScore}.
                
              </p>
            </div>
            <div className="modal--bottom">
              <p>
                It's big brain time!<br/>Match all the cards with the least number of moves.
              </p>
              
              <button className="modal__btn" onClick={this.props.onPlayClick}>
                Play
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

export default PlayModal;