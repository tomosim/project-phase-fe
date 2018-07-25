import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LoginRegisterScreen from "./components/LoginRegisterScreen";
import Home from "./components/Home";

export default class App extends Component<Props> {
  state = { currentUser: { username: "tom" }, register: false };

  login = (username, password) => {
    // authentification logic
    // .then(...
    this.setState({ currentUser: {} });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentUser.username === "" && <LoginRegisterScreen />}
        {this.state.currentUser.username !== "" && <Home />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(0,220,90)"
  }
});
