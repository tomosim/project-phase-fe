import React, { Component } from "react";
import { View } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.toggleStopwatch();
    }
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart
    });
  }

  render() {
    console.log(this.state.stopwatchStart)
    return (
      <View>
        <Stopwatch start={this.state.stopwatchStart} options={options} />
      </View>
    );
  }
}

const options = {
  container: {
    backgroundColor: "rgb(0,220,90)",
    padding: 5,
    borderRadius: 5,
    width: 220
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    marginLeft: 7,
    textAlign: "center"
  }
};
export default Counter;