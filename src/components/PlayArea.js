import React from "react";
import Tile from "./Tile"
import PlayFooter from "./PlayFooter"

class PlayArea extends React.Component {
    tiles = [
      {
        name: "face-with-tears-of-joy",
        accent: "#ffcc33",
        icon: "😂"
      },
      {
        name: "turkey",
        accent: "rgb(171, 153, 142)",
        icon: "🦃"
      },
      {
        name: "monkey-face",
        accent: "rgb(151, 123, 75)",
        icon: "🐵"
      },
      {
        name: "ear-of-maize",
        accent: "rgb(138, 181, 115)",
        icon: "🌽"
      },
      {
        name: "snowman-without-snow",
        accent: "#ffffff",
        icon: "⛄"
      },
      {
        name: "beer-mug",
        accent: "goldenrod",
        icon: "🍺"
      },
      {
        name: "thinking-face",
        accent: "yellow",
        icon: "🤔"
      },
      {
        name: "racing-car",
        accent: "#DC143C",
        icon: "🏎️"
      }
    ];
  
    constructor(props) {
      super(props);
  
      this.state = {
        tiles: [],
        turns: 0,
        activeTile: null
      };
  
      this.handleClick = this.handleClick.bind(this);
      this.resetPlayArea = this.resetPlayArea.bind(this);
    }
  
    shuffleTiles(tiles) {
      let j, x, i;
  
      for (i = tiles.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = tiles[i];
        tiles[i] = tiles[j];
        tiles[j] = x;
      }
  
      return tiles;
    }
  
    multiplyTiles(tiles) {
      return tiles
        .map(item => {
          // Use Object.assign to create a new object rather than passing the same reference twice
          return [item, Object.assign({}, item)];
        })
        .reduce((a, b) => {
          return a.concat(b);
        });
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.gameOver !== this.props.gameOver && !nextProps.gameOver) {
        const newTiles = this.tiles.map(e => {
          e.status = "unselected";
  
          return e;
        });
  
        this.setState({
          tiles: this.shuffleTiles(this.multiplyTiles(newTiles))
        });
      }
    }
  
    handleClick(index) {
      // Update turns on every click
      this.setState({ turns: this.state.turns + 1 });
  
      const selectedTile = this.state.tiles[index];
      const updatedTiles = this.state.tiles.slice();
  
      selectedTile.status = "selected";
      updatedTiles[index] = selectedTile;
  
      this.setState({
        tiles: updatedTiles
      });
  
      if (this.state.activeTile === null) {
        this.setState({
          activeTile: selectedTile
        });
      } else if (selectedTile.name === this.state.activeTile.name) {
        let matched = 0;
  
        const updatedTiles = this.state.tiles.map(e => {
          if (e.name === selectedTile.name) e.status = "matched";
          if (e.status === "matched") matched++;
  
          return e;
        });
  
        this.setState({
          tiles: updatedTiles,
          activeTile: null
        });
  
        if (matched === 16) this.resetPlayArea();
      } else {
        const _this = this;
  
        setTimeout(function() {
          const updatedTiles = _this.state.tiles.map(e => {
            if (
              e.name === _this.state.activeTile.name ||
              e.name === selectedTile.name
            ) {
              e.status = "unselected";
            }
            return e;
          });
  
          _this.setState({
            activeTile: null,
            tiles: updatedTiles
          });
        }, 700);
      }
    }
  
    resetPlayArea() {
      this.props.onGameOver(this.state.turns);
  
      this.setState({
        tiles: [],
        turns: 0,
        activeTile: null
      });
    }
  
    render() {
      let cindex = 0;
      return (
        <div className="area__wrapper">
          <h1 className="area__head">Big Brain Time</h1>
          <ul className="area">
            {this.state.tiles.map(e => (
              <Tile
                index={cindex++}
                status={e.status}
                icon={e.icon}
                accent={e.accent}
                onClickListener={this.handleClick}
              />
            ))}
          </ul>
          {!this.props.gameOver ? (
            <PlayFooter turns={this.state.turns} gameOver={this.props.gameOver} />
          ) : null}
        </div>
      );
    }
  }
export default PlayArea;