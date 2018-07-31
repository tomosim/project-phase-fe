import React, { Component } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import auth from '../config/config'
import ErrorPopUp from './ErrorPopUp'

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  switchToRegister = () => {
    this.props.switchLoginRegister();
  };

  handleInput = (e, inputField) => {
    this.setState({ [inputField]: e });
  };

  //login functionality
  loginUser = (email, password) => {
    const { login, loading } = this.props
    loading()
    auth
    .signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then(() => {
      login(email)
    })
    .catch(err => {
      loading()
      ErrorPopUp(err.code)
    }
    )
  }

  render() {
    return (
      <View style={{ width: "90%" }}>
        <TextInput
          id="email"
          style={styles.input}
          onChangeText={e => this.handleInput(e, "email")}
          value={this.state.email}
          placeholder={"email"}
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
          onPress={() => this.loginUser(this.state.email, this.state.password)}
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
