import React from "react";

class Tile extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      if (this.props.status === "unselected") {
        this.props.onClickListener(this.props.index);
      } else {
        console.warn("The tile has already been " + this.props.status);
      }
    }
  
    render() {
      return (
        <div
          onClick={this.handleClick}
          className={
            "tile " +
            (this.props.status === "selected"
              ? "tile--selected"
              : this.props.status === "matched"
                ? "tile--selected tile--matched"
                : "")
          }
        >
          <div className="tile--front" />
          <div
            className="tile--back"
            style={{ backgroundColor: this.props.accent }}
          >
            {this.props.icon}
          </div>
        </div>
      );
    }
  }
  export default Tile;