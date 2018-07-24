import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component<Props> {
  state = { currentUser: {}, register: false };

  login = (username, password) => {
    // authentification logic
    // .then(...
    this.setState({ currentUser: {} });
  };

  switchLoginRegister = () => {
    this.setState({ register: !this.state.register });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>e-missions</Text>

        {!this.state.register && (
          <Login switchLoginRegister={this.switchLoginRegister} />
        )}

        {this.state.register && (
          <Register switchLoginRegister={this.switchLoginRegister} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontFamily: "Pacifico-Regular",
    fontSize: 80,
    color: "rgb(0,220,90)",
    textAlign: "center",
    margin: 0
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
