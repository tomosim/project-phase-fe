import React, { Component } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import auth from '../config/config'


class Register extends Component {
  state = {
    email: "",
    emailOK: false,
    username: "",
    password1: "",
    password2: "",
    chapter: 0
  };

  switchToLogin = () => {
    this.props.switchLoginRegister();
  };

  //email validation
  handleInput = (e, inputField) => {
    this.setState({ [inputField]: e });
    inputField === "email"
      ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          e
        )
        ? this.setState({ emailOK: true })
        : this.setState({ emailOK: false })
      : null;
  };

  // create user via firebase
  addNewUser = (email, username, password) => {
    const {signup} = this.props
    auth
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => {
        signup(email, username)
      })
      .catch(console.log)
  };

  // changes the registration screens
  next = () => {
    this.setState({ chapter: this.state.chapter + 1 });
  };

  back = () => {
    this.setState({ chapter: this.state.chapter - 1 });
  };

  render() {

    return (
      <View style={{ width: "90%" }}>
        {this.state.chapter === 0 && (
          <View>
            <Text>Please enter your email</Text>
            <TextInput
              id="email"
              style={styles.input}
              onChangeText={e => this.handleInput(e, "email")}
              value={this.state.email}
              placeholder={"email"}
            />
            <View style={styles.progress}>
              {this.state.emailOK && (
                <Button
                  color="rgb(0,220,90)"
                  title="Next"
                  onPress={this.next}
                />
              )}
            </View>
          </View>
        )}

        {this.state.chapter === 1 && (
          <View>
            <Text>Please enter your desired username</Text>
            <TextInput
              id="username"
              style={styles.input}
              onChangeText={e => this.handleInput(e, "username")}
              value={this.state.username}
              placeholder={"username"}
            />
            <View style={styles.progress}>
              <Button color="rgb(0,220,90)" title="Back" onPress={this.back} />
              {this.state.username !== "" && (
                <Button
                  color="rgb(0,220,90)"
                  title="Next"
                  onPress={this.next}
                />
              )}
            </View>
          </View>
        )}

        {this.state.chapter === 2 && (
          <View>
            <Text>Please enter your desired password</Text>
            <TextInput
              id="password1"
              style={styles.input}
              onChangeText={e => this.handleInput(e, "password1")}
              value={this.state.password1}
              placeholder={"password"}
              clearTextOnFocus
              secureTextEntry
            />
            <View style={styles.progress}>
              <Button color="rgb(0,220,90)" title="Back" onPress={this.back} />
              {this.state.password1 !== "" && (
                <Button
                  color="rgb(0,220,90)"
                  title="Next"
                  onPress={this.next}
                />
              )}
            </View>
          </View>
        )}

        {this.state.chapter === 3 && (
          <View>
            <Text>Please confirm your password</Text>
            <TextInput
              id="password2"
              style={styles.input}
              onChangeText={e => this.handleInput(e, "password2")}
              value={this.state.password2}
              placeholder={"confirm password"}
              clearTextOnFocus
              secureTextEntry
            />
            <View style={styles.progress}>
              <Button color="rgb(0,220,90)" title="Back" onPress={this.back} />
              {this.state.password1 === this.state.password2 && (
                <Button
                  color="rgb(0,220,90)"
                  title="Register"
                  color="rgb(0,220,90)"
                  onPress={() => this.addNewUser(this.state.email, this.state.username, this.state.password1)}
                />
              )}
            </View>
          </View>
        )}

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
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "#F5FCFF",
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default Register;
