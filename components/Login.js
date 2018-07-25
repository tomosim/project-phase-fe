import React, { Component } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  switchToRegister = () => {
    this.props.switchLoginRegister();
  };

  handleInput = (e, inputField) => {
    this.setState({ [inputField]: e });
  };

  handlePress = () => {
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <View style={{ width: "90%" }}>
        <TextInput
          id="username"
          style={styles.input}
          onChangeText={e => this.handleInput(e, "username")}
          value={this.state.username}
          placeholder={"username"}
        />

        <TextInput
          id="password"
          style={styles.input}
          secureTextEntry
          onChangeText={e => this.handleInput(e, "password")}
          value={this.state.password}
          placeholder={"password"}
          clearTextOnFocus
        />

        <Button
          title="Login"
          color="rgb(0,220,90)"
          onPress={this.handlePress}
        />

        <Text style={styles.text}>New user?</Text>

        <Button
          title="Register"
          color="rgb(0,220,90)"
          onPress={this.switchToRegister}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    margin: 10
  },
  input: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "#F5FCFF",
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default Login;
