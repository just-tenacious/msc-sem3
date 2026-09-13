import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    console.log("Component Mounted");
  }

  componentDidUpdate() {
    console.log("Component Updated");
  }

  increaseCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <div className="counter">
        <h2>Counter: {this.state.count}</h2>

        <button onClick={this.increaseCount}>
          Increase Counter
        </button>
      </div>
    );
  }
}

export default Counter;