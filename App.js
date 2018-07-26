import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LoginRegisterScreen from "./components/LoginRegisterScreen";
import Home from "./components/Home";
import * as api from './api'

export default class App extends Component<Props> {
  state = { currentUser: { username: "" }, register: false };

  // signup
  signup = async (email, username) => {
    const avatar = 'https://images.pexels.com/photos/301448/pexels-photo-301448.jpeg?auto=compress&cs=tinysrgb&h=350'
    const newUser = {email, username, avatar}
    await api.createUser(newUser)
      .then((user) => {
        console.log(user)
        this.setState({ currentUser: {
          username:user.username
        } });
      })
      .catch(console.log)
  };

  //login
  login = async (email) => {
    await api.fetchUserByEmail(email)
    .then((user) => {
      console.log(user, '<<<<<<<<<<<')
      this.setState({currentUser: {
        username:user.username
      }})
    })
    .catch(console.log)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentUser.username === "" && <LoginRegisterScreen login={this.login} signup={this.signup}/>}
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


