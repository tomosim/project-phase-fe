import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LoginRegisterScreen from "./components/LoginRegisterScreen";
import Home from "./components/Home";
import * as api from "./api";

export default class App extends Component<Props> {
  state = { currentUser: { username: "" }, register: false };

  // signup
  signup = async (email, username) => {
    const avatar =
      "https://images.pexels.com/photos/301448/pexels-photo-301448.jpeg?auto=compress&cs=tinysrgb&h=350";
    const newUser = { email, username, avatar };
    await api
      .createUser(newUser)
      .then(user => {
        this.setState({
          currentUser: {
            username: user.username
          }
        });
      })
      .catch(console.log);
  };

  //login
  login = async email => {
    await api
      .fetchUserByEmail(email)
      .then(user => {
        this.setState({
          currentUser: {
            username: user.username
          }
        });
      })
      .catch(console.log);
  };


  logout = () => {
    this.setState({
      currentUser: { username: "" }
    });
  };

  // displays a default loading screen when loading content
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  render() {
    const { loading } = this.state
    return (
      <View style={styles.container}>
        {this.state.currentUser.username === "" && (
          <LoginRegisterScreen login={this.login} signup={this.signup} />
        )}
        {this.state.currentUser.username !== "" && (
          <Home logout={this.logout} />
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(0,220,90)"
  }
});
