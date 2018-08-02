import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LoginRegisterScreen from "./components/LoginRegisterScreen";
import Home from "./components/Home";

import * as api from "./api";
import Loading from "./components/Loading";
import ErrorPopUp from "./components/ErrorPopUp";

export default class App extends Component<Props> {
  state = {
    currentUser: {
      username: "",
      achievements: [],
      _id: "",
      emain: "",
      avatar: "",
      xp: 0
    },
    register: false,
    loading: false
  };

  // signup
  signup = async (email, username) => {
    const newUser = { email, username };
    await api
      .createUser(newUser)
      .then(user => {
        this.setState({
          //currentUser: user.data.user,  Vel's
          currentUser: user.data.newUser,
          loading: false
        });
      })
      .catch(err => {
        // Future plan- send message to backend admin if this is fired.
        ErrorPopUp(err);
        this.toggleLoading();
      })
      .catch(console.log);
  };

  //login
  login = async (email) => {
    await api
      .fetchUserByEmail(email)
      .then(user => {
        this.setState({
          currentUser: user.data.user,
          loading: false
        });
      })
      .catch(err => {
        ErrorPopUp(err);
        this.toggleLoading();
      });
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
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        {this.state.currentUser.username === "" && (
          <LoginRegisterScreen
            login={this.login}
            signup={this.signup}
            loading={this.toggleLoading}
          />
        )}

        {this.state.currentUser.username !== "" && (
          <Home logout={this.logout} user={this.state.currentUser}/>
        )} 

        {loading && <Loading />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(0,220,90)"
  }
});
