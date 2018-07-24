import React, { Component } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

class Login extends Component {
  state = {
    username: "",
    password: "",
    register: false
  };

  switchToRegister = () => {
    this.setState({ register: true });
  };

  handleUsernameInput = e => {
    this.setState({ username: e });
  };

  handlePasswordInput = e => {
    this.setState({ password: e });
  };

  handlePress = () => {
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <View style={{ width: "90%" }}>
        <TextInput
          id="username"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10
          }}
          onChangeText={this.handleUsernameInput}
          value={this.state.username}
          placeholder={"username"}
        />

        <TextInput
          id="password"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10
          }}
          secureTextEntry
          onChangeText={this.handlePasswordInput}
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
  }
});

export default Login;
