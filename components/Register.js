import React, { Component } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

class Register extends Component {
  state = { email: "", username: "", password: "" };

  switchToLogin = () => {
    this.props.switchLoginRegister();
  };

  handleEmailInput = e => {
    this.setState({ email: e });
  };

  handleUsernameInput = e => {
    this.setState({ username: e });
  };

  handlePasswordInput = e => {
    this.setState({ password: e });
  };

  addNewUser = (email, username, password) => {
    //api.addNewUser()
  };

  render() {
    return (
      <View style={{ width: "90%" }}>
        <TextInput
          id="email"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10
          }}
          onChangeText={this.handleEmailInput}
          value={this.state.email}
          placeholder={"email"}
        />

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
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          placeholder={"password"}
        />

        <Button
          title="Register"
          color="rgb(0,220,90)"
          onPress={this.addNewUser}
        />

        <Text style={styles.text}>Already have an account?</Text>

        <Button
          title="Login"
          color="rgb(0,220,90)"
          onPress={this.switchToLogin}
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

export default Register;
