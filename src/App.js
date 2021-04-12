import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyOperation = this.handleKeyOperation.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleBksp = this.handleBksp.bind(this);

    this.state = {
      display: "0",
      firstKeyPress: true,
      underOperation: false,
      result: 0,
      displayOperation: " ",
    };
  }

  handleKeyPress(str) {
    if (this.state.display.length >= 23 || this.state.pressedEqual) {
      return;
    }
    let toDisplay = this.state.display;
    if (this.state.firstKeyPress) {
      toDisplay = str;
    } else {
      toDisplay = this.state.display + str;
    }
    this.setState({
      display: toDisplay,
      firstKeyPress: false,
      underOperation: this.state.underOperation,
      result: this.state.result,
      pressedEqual: false,
    });
  }

  handleKeyOperation(str) {
    if (this.state.firstKeyPress || this.state.pressedEqual) {
      return;
    }
    let result = this.state.display;
    if (this.state.underOperation) {
      result = this.handleEqual();
    }

    this.setState({
      displayOperation: String(result) + " " + str,
      display: 0,
      firstKeyPress: true,
      underOperation: str,
      result: parseInt(result),
      pressedEqual: false,
    });
  }

  handleEqual() {
    if (this.state.firstKeyPress || this.state.pressedEqual) {
      return;
    }

    let result = 0;

    if (this.state.underOperation === "+") {
      result = this.state.result + parseInt(this.state.display);
    } else if (this.state.underOperation === "-") {
      result = this.state.result - parseInt(this.state.display);
    } else if (this.state.underOperation === "X") {
      result = this.state.result * parseInt(this.state.display);
    } else if (this.state.underOperation === "/") {
      result = this.state.result / parseInt(this.state.display);
    } else {
      result = this.state.display;
    }

    if (String(result).length >= 23 || result >= Number.MAX_SAFE_INTEGER) {
      result = "ERR";
    }
    this.setState({
      displayOperation: this.state.displayOperation + " " + this.state.display,
      display: String(result),
      firstKeyPress: true,
      underOperation: false,
      result: result,
      pressedEqual: true,
    });

    return result;
  }

  handleClear() {
    this.setState({
      displayOperation: " ",
      display: "0",
      firstKeyPress: true,
      underOperation: false,
      result: 0,
      pressedEqual: false,
    });
  }

  handleBksp() {
    if (this.firstKeyPress || this.state.pressedEqual) {
      return;
    }
    let bksp = this.state.display;
    bksp = bksp.split("");
    bksp.pop();
    bksp = bksp.join("");

    this.setState({
      displayOperation: this.state.displayOperation,
      display: bksp,
      firstKeyPress: this.state.firstKeyPress,
      underOperation: this.state.underOperation,
      result: this.state.result,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Calculator, React version</h1>
        <hr></hr>
        <div className="CalculatorArea">
          <div className="CalcDisplay">
            <div>{this.state.displayOperation}</div>
            <div>{this.state.display}</div>
          </div>
          <div className="TopLine">
            <button
              className="SpecialButton"
              onClick={() => {
                this.handleClear();
              }}
            >
              CLR
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleEqual();
              }}
            >
              =
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyOperation("+");
              }}
            >
              +
            </button>
          </div>
          <div className="Line">
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("7");
              }}
            >
              7
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("8");
              }}
            >
              8
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("9");
              }}
            >
              9
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyOperation("-");
              }}
            >
              -
            </button>
          </div>
          <div className="Line">
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("4");
              }}
            >
              4
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("5");
              }}
            >
              5
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("6");
              }}
            >
              6
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyOperation("X");
              }}
            >
              X
            </button>
          </div>
          <div className="Line">
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("1");
              }}
            >
              1
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("2");
              }}
            >
              2
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyPress("3");
              }}
            >
              3
            </button>
            <button
              className="BasicButton"
              onClick={() => {
                this.handleKeyOperation("/");
              }}
            >
              /
            </button>
          </div>
          <div className="Line">
            <button
              className="BasicXLButton"
              onClick={() => {
                this.handleKeyPress("0");
              }}
            >
              0
            </button>
            <button
              className="BasicXLButton"
              onClick={() => {
                this.handleBksp();
              }}
            >
              Bksp
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
