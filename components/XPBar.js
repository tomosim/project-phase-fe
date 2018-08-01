import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedBar from "react-native-animated-bar";

export default class XPBar extends Component {
  state = {
    progress: 0.5
  };

  componentDidUpdate(prevProps) {
    if (prevProps.XP !== this.props.XP) {
      // console.log(this.props.XP);
    }
  }
  // interval = () =>
  //   setInterval(() => {
  //     if (this.state.progress > 0.9) return clearInterval(interval);

  //     this.setState(state => {
  //       return {
  //         progress: state.progress + 0.1
  //       };
  //     });
  //   }, 1000);

  render() {
    return (
      <View>
        <View>
          <AnimatedBar
            progress={this.state.progress}
            height={20}
            borderColor="rgb(150,180,150)"
            barColor="rgb(0,220,90)"
            borderRadius={5}
            borderWidth={2}
            duration={500}
          />
        </View>
        <Text style={styles.text}>Next rank: Trembesi</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "flex-end",
    marginTop: 3,
    fontSize: 18,
    fontStyle: "italic"
  }
});
