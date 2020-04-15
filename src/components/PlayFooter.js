import React from "react";

class PlayFooter extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        elapsed: 0
      };
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.gameOver !== this.props.gameOver && nextProps.gameOver) {
        clearInterval(this.timer);
  
        this.setState({ elapsed: 0 });
      }
    }
  
    componentDidMount() {
      this.timer = setInterval(() => {
        this.setState({ elapsed: this.state.elapsed + 1 });
      }, 1000);
    }
  
    render() {
      return (
        <div className="area__footer">
          <p>Turns : {this.props.turns}</p>
          <p>Time : {this.state.elapsed} sec</p>
        </div>
      );
    }
  }
  export default PlayFooter;