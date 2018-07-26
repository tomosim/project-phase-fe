import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.toggleStopwatch();
    }
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false
    });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <View>
        <Stopwatch
          start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime}
        />
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

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
